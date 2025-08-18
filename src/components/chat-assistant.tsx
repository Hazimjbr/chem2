
'use client';
import { useState, Fragment, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { z } from 'zod';
import { InlineMath, BlockMath } from 'react-katex';
import { cn } from '@/lib/utils.tsx';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    }))
  })).describe("The chat history."),
});
type ChatInput = z.infer<typeof ChatInputSchema>;

type Message = {
  role: 'user' | 'model';
  content: { text: string }[];
};

const renderMessageContent = (text: string) => {
    if (!text) return null;

    // This regex finds:
    // 1. Block math ($$...$$)
    // 2. Inline math ($...$)
    // It captures them, and the text outside them is also part of the result array.
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

    return parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith('$$') && part.endsWith('$$')) {
            // Block Math
            return <BlockMath key={index} math={part.slice(2, -2)} />;
        }
        if (part.startsWith('$') && part.endsWith('$')) {
            // Inline Math
            // Wrap in a span with dir="ltr" to ensure correct rendering direction
            return <span dir="ltr" key={index} style={{ display: 'inline-block' }}><InlineMath math={part.slice(1, -1)} /></span>;
        }

        // For regular text parts, we wrap them to ensure correct rendering direction
        return <span key={index}>{part}</span>;
    });
};


export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages from sessionStorage on mount
    try {
      const savedMessages = sessionStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error("Failed to load chat messages from session storage:", error);
    }
  }, []);

  useEffect(() => {
    // Save messages to sessionStorage whenever they change
    try {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
        console.error("Failed to save chat messages to session storage:", error);
    }
     if (scrollAreaRef.current) {
      // @ts-ignore
      scrollAreaRef.current.children[1].scrollTop = scrollAreaRef.current.children[1].scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
        const chatInput: ChatInput = {
            history: newMessages,
        };
      const response = await chat(chatInput);
      const modelMessage: Message = {
        role: 'model',
        content: [{ text: response }],
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error getting response from AI:', error);
      const errorMessage: Message = {
        role: 'model',
        content: [{ text: 'عذراً، حدث خطأ. الرجاء المحاولة مرة أخرى.' }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Bot /> المساعد الكيميائي الذكي
        </CardTitle>
        <CardDescription>
            اسأل أي سؤال يتعلق بكيمياء التوجيهي الأردني.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'model' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 text-sm max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {(message.content[0].text || '').split('\n').map((line, i) => {
                     // Heuristic to detect if the line is primarily a block equation
                    const isBlockEquation = line.includes('$$');
                    return (
                        <p key={i} dir="ltr" className={cn(isBlockEquation && 'text-left')}>
                            {renderMessageContent(line)}
                        </p>
                    )
                  })}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User size={20}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                  </Avatar>
                <div className="rounded-lg px-4 py-2 text-sm bg-muted">
                     أفكر...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            id="message"
            placeholder="اسأل عن أي شيء في الكيمياء..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">إرسال</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
