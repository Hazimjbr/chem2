import { Atom, Beaker, FileText, FlaskConical } from "lucide-react";

export const units = [
    {
      id: 'unit-1',
      title: 'الوحدة 1: حالات المادة',
      icon: Atom,
      progress: 0,
      lessons: [
        {
          title: 'الدرس 1: الحالة الغازية',
          lessonNum: 1,
          parts: [
            { title: 'نظرية الحركة الجزيئية', partNum: 1 },
            { title: 'مقدمة قوانين الغازات', partNum: 2 },
            { title: 'قانون بويل', partNum: 3 },
            { title: 'قانون شارل', partNum: 4 },
            { title: 'قانون جاي لوساك', partNum: 5 },
            { title: 'القانون الجامع', partNum: 6 },
            { title: 'قانون أفوجادرو', partNum: 7 },
            { title: 'قانون الغاز المثالي', partNum: 8 },
            { title: 'قانون دالتون', partNum: 9 },
            { title: 'قانون جراهام', partNum: 10 },
          ],
        },
        {
          title: 'الدرس 2: الحالة السائلة',
          lessonNum: 2,
          parts: [
            { title: 'مقدمة عن المواد السائلة', partNum: 1 },
            { title: 'التبخر', partNum: 2 },
            { title: 'التكاثف', partNum: 3 },
            { title: 'الضغط البخاري', partNum: 4 },
            { title: 'درجة الغليان', partNum: 5 },
          ],
        },
        {
          title: 'الدرس 3: الحالة الصلبة',
          lessonNum: 3,
          parts: [
            { title: 'مقدمة عن المواد الصلبة', partNum: 1 },
            { title: 'المواد الصلبة البلورية الجزيئية', partNum: 2 },
            { title: 'المواد الصلبة البلورية الشبكية التساهمية', partNum: 3 },
            { title: 'المواد الصلبة البلورية الفلزية', partNum: 4 },
            { title: 'المواد الصلبة البلورية الأيونية', partNum: 5 },
          ],
        },
        {
          title: 'الإثراء والتوسع',
          sectionNum: 4,
          parts: [
              { title: 'الربط', partNum: 1 },
              { title: 'الإثراء', partNum: 2 }
          ],
        },
        { title: 'مراجعة الوحدة', sectionNum: 5, parts: [{ title: 'ابدأ المراجعة' }] },
      ],
    },
    {
      id: 'unit-2',
      title: 'الوحدة 2: المحاليل',
      icon: Beaker,
      progress: 0,
      lessons: [
         {
          title: 'الدرس 1: تصنيف المحاليل',
          lessonNum: 1,
          parts: [
              { title: 'تصنيف المواد', partNum: 1 },
              { title: 'تكون المحاليل', partNum: 2 },
              { title: 'المحاليل السائلة', partNum: 3 },
          ],
        },
         {
          title: 'الدرس 2: خصائص المحاليل',
          lessonNum: 2,
          parts: [
              { title: 'الخصائص الجامعة للمحاليل', partNum: 1 },
              { title: 'الانخفاض في الضغط البخاري', partNum: 2 },
              { title: 'الارتفاع في درجة الغليان', partNum: 3 },
              { title: 'الانخفاض في درجة التجمد', partNum: 4 },
              { title: 'الضغط الأسموزي', partNum: 5 },
          ],
        },
        {
          title: 'الإثراء والتوسع',
          sectionNum: 3,
          parts: [
              { title: 'الربط', partNum: 1 },
              { title: 'الإثراء', partNum: 2 }
          ],
        },
        { title: 'مراجعة الوحدة', sectionNum: 4, parts: [{ title: 'ابدأ المراجعة' }] },
      ],
    },
    {
      id: 'unit-3',
      title: 'الوحدة 3: الاتزان الكيميائي',
      icon: FlaskConical,
      progress: 0,
      lessons: [
         {
          title: 'الدرس 1: الاتزان الكيميائي والعوامل المؤثرة فيه',
          lessonNum: 1,
          parts: [
              { title: 'أنواع التفاعلات الكيميائية', partNum: 1 },
              { title: 'العوامل المؤثرة في الاتزان الكيميائي/ التركيز', partNum: 2 },
              { title: 'العوامل المؤثرة في الاتزان الكيميائي/ الضغط', partNum: 3 },
              { title: 'العوامل المؤثرة في الاتزان الكيميائي/ درجة الحرارة', partNum: 4 },
              { title: 'العامل المساعد', partNum: 5 },
          ],
        },
         {
          title: 'الدرس 2: تعبيرات ثابت الاتزان والحسابات المتعلقة به',
          lessonNum: 2,
          parts: [
              { title: 'تعبيرات ثابت الاتزان', partNum: 1 },
              { title: 'الحسابات المتعلقة بثابت الاتزان', partNum: 2 },
              { title: 'حساب تراكيز المواد عند الاتزان', partNum: 3 },
          ],
        },
        {
          title: 'الإثراء والتوسع',
          sectionNum: 3,
          parts: [
              { title: 'الربط', partNum: 1 },
              { title: 'الإثراء', partNum: 2 }
          ],
        },
        { title: 'مراجعة الوحدة', sectionNum: 4, parts: [{ title: 'ابدأ المراجعة' }] },
      ],
    },
      {
      id: 'unit-4',
      title: 'الوحدة 4: الحموض والقواعد وتطبيقاتها',
      icon: FileText,
      progress: 0,
      lessons: [
         {
          title: 'الدرس 1: الحموض والقواعد',
          lessonNum: 1,
          parts: [
              { title: 'مفهوم أرهينيوس', partNum: 1 },
              { title: 'مفهوم برونستد – لوري', partNum: 2 },
              { title: 'مفهوم لويس', partNum: 3 },
          ],
        },
         {
          title: 'الدرس 2: الرقم الهيدروجيني ومحاليل الحموض والقواعد القوية',
          lessonNum: 2,
          parts: [
              { title: 'التأين الذاتي للماء', partNum: 1 },
              { title: 'محاليل الحموض والقواعد القوية', partNum: 2 },
              { title: 'الرقم الهيدروجيني pH والرقم الهيدروكسيلي pOH', partNum: 3 },
              { title: 'معايرة الحمض والقاعدة', partNum: 4 },
              { title: 'الكواشف', partNum: 5 },
          ],
        },
         {
          title: 'الدرس 3: الحموض والقواعد الضعيفة',
          lessonNum: 3,
          parts: [
              { title: 'الاتزان في محاليل الحموض الضعيفة', partNum: 1 },
              { title: 'الاتزان في محاليل القواعد الضعيفة', partNum: 2 },
          ],
        },
          {
          title: 'الدرس 4: الأملاح والمحاليل المنظمة',
          lessonNum: 4,
          parts: [
              { title: 'الخصائص الحمضية والقاعدية للأملاح', partNum: 1 },
              { title: 'تأثير الأيون المشترك', partNum: 2 },
              { title: 'المحاليل المنظمة', partNum: 3 },
          ],
        },
        {
          title: 'الإثراء والتوسع',
          sectionNum: 5,
          parts: [
              { title: 'الربط', partNum: 1 },
              { title: 'الإثراء', partNum: 2 }
          ],
        },
        { title: 'مراجعة الوحدة', sectionNum: 6, parts: [{ title: 'ابدأ المراجعة' }] },
      ],
    },
  ];
