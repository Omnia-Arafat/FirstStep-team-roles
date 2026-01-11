import { TeamMember } from '@/types/team';

export const teamData: TeamMember[] = [
  {
    id: '1',
    name: { en: "Abeer Alhadi", ar: "عبير الهادي" },
    role: { en: "Owner", ar: "المالكة" },
    roleType: "owner",
    desc: {
      en: "Ultimate authority on company vision, strategic direction, and high-level business decisions.",
      ar: "السلطة النهائية على رؤية الشركة، التوجه الاستراتيجي، والقرارات التجارية عالية المستوى."
    },
    details: {
      en: ["Define company vision", "Approve strategic plans", "Oversee key partnerships"],
      ar: ["تحديد رؤية الشركة", "الموافقة على الخطط الاستراتيجية", "الإشراف على الشراكات الأساسية"]
    }
  },
  {
    id: '2',
    name: { en: "Ghada Alsheikh", ar: "غادة الشيخ" },
    role: { en: "Co-Founder", ar: "الشريكة المؤسسة" },
    roleType: "owner",
    desc: {
      en: "Supports strategic planning, business growth initiatives, and high-level product decisions.",
      ar: "تدعم التخطيط الاستراتيجي، مبادرات نمو الأعمال، وقرارات المنتج على مستوى عالي."
    },
    details: {
      en: ["Business strategy planning", "Growth initiatives oversight", "Product decision support"],
      ar: ["تخطيط استراتيجية الأعمال", "متابعة مبادرات النمو", "دعم قرارات المنتج"]
    }
  },
  {
    id: '3',
    name: { en: "Gamel Alshaer", ar: "جميل الشاعر" },
    role: { en: "CTO", ar: "المدير التقني" },
    roleType: "cto",
    desc: {
      en: "Responsible for defining technical architecture, setting technology standards, and ensuring engineering excellence across projects.",
      ar: "مسؤول عن تحديد البنية التقنية، وضع معايير التكنولوجيا، وضمان التميز الهندسي في جميع المشاريع."
    },
    details: {
      en: ["System architecture", "Technology strategy", "Engineering standards"],
      ar: ["بنية النظام", "استراتيجية التكنولوجيا", "معايير الهندسة"]
    }
  },
  {
    id: '4',
    name: { en: "Omnia Arafat", ar: "أمنية عرفات" },
    role: { en: "Project Manager", ar: "مديرة المشاريع" },
    roleType: "pm",
    desc: {
      en: "Oversees project execution, daily operations, team coordination, and frontend implementation. Has authority to approve or reject any daily or internal team decisions, issue official warnings, and manage task priorities in the absence of the CTO.",
      ar: "تشرف على تنفيذ المشاريع، العمليات اليومية، تنسيق الفريق، وتنفيذ تطوير الواجهة الأمامية. لها الحق بالموافقة أو الرفض على أي قرار يومي أو داخلي للفريق، إصدار الإنذارات الرسمية، وإدارة أولويات المهام في حالة غياب المدير التقني."
    },
    details: {
      en: [
        "Project oversight & daily operations",
        "Decision authority on internal team matters",
        "Task prioritization in CTO absence",
        "Issue official warnings",
        "Problem solving & client issue management",
        "Internal & external communication coordination",
        "Server & system monitoring",
        "Onboarding new team members",
        "Frontend development supervision & quality assurance",
        "Implement UI designs and frontend logic review",
        "Ensure smooth frontend performance"
      ],
      ar: [
        "إشراف على تنفيذ المشاريع والعمليات اليومية",
        "سلطة اتخاذ القرار على الأمور الداخلية للفريق",
        "تحديد أولويات المهام في حالة غياب المدير التقني",
        "إصدار الإنذارات الرسمية",
        "حل المشاكل وإدارة قضايا العملاء",
        "تنسيق التواصل الداخلي والخارجي مع الفريق",
        "متابعة السيرفرات والنظام",
        "تهيئة وإدخال الأعضاء الجدد للنظام",
        "الإشراف على تطوير الواجهة الأمامية وضمان الجودة",
        "مراجعة تنفيذ تصميمات الواجهة الأمامية والمنطق البرمجي",
        "ضمان الأداء السلس للواجهة الأمامية"
      ]
    }
  },
  {
    id: '5',
    name: { en: "Menna Emara", ar: "منة عمارة" },
    role: { en: "Product Designer", ar: "مصممة المنتج" },
    roleType: "design",
    desc: {
      en: "Leads UX/UI design, defines product experience, and analyzes competitors to recommend new features.",
      ar: "تقود تصميم تجربة المستخدم وواجهة الاستخدام، وتحدد تجربة المنتج، وتدرس المنافسين لتوصية الميزات الجديدة."
    },
    details: {
      en: ["UX/UI design", "Product flows & experience", "Competitor analysis for feature recommendations"],
      ar: ["تصميم تجربة المستخدم وواجهة الاستخدام", "تدفقات المنتج وتجربة المستخدم", "تحليل المنافسين لتوصية الميزات الجديدة"]
    }
  },
  {
    id: '6',
    name: { en: "Amr Taha", ar: "عمرو طه" },
    role: { en: "Frontend Developer", ar: "مطور واجهات" },
    roleType: "frontend",
    desc: {
      en: "Implements user interface designs and frontend logic to ensure optimal user experience.",
      ar: "ينفذ تصميمات واجهة المستخدم والمنطق الأمامي لضمان تجربة مستخدم مثالية."
    },
    details: {
      en: ["UI implementation", "Frontend logic", "Performance optimization"],
      ar: ["تنفيذ واجهة المستخدم", "المنطق الأمامي", "تحسين الأداء"]
    }
  },
  {
    id: '7',
    name: { en: "Eslam Elsayed", ar: "إسلام السيد" },
    role: { en: "Backend Developer", ar: "مطور خلفي" },
    roleType: "backend",
    desc: {
      en: "Responsible for APIs, database management, integrations, and maintaining backend system reliability.",
      ar: "مسؤول عن واجهات برمجة التطبيقات، إدارة قواعد البيانات، التكاملات، والحفاظ على موثوقية النظام الخلفي."
    },
    details: {
      en: ["API development", "Database management", "System integrations"],
      ar: ["تطوير واجهات البرمجة", "إدارة قواعد البيانات", "التكاملات النظامية"]
    }
  },
  {
    id: '8',
    name: { en: "Momen Mohamed", ar: "مؤمن محمد" },
    role: { en: "Flutter Developer", ar: "مطور تطبيقات" },
    roleType: "mobile",
    desc: {
      en: "Develops and maintains mobile applications using Flutter, ensuring performance and optimization.",
      ar: "يطور ويحافظ على تطبيقات الهاتف باستخدام فلاتر، مع ضمان الأداء والتحسين."
    },
    details: {
      en: ["Flutter development", "Mobile optimization", "App performance"],
      ar: ["تطوير فلاتر", "تحسين تطبيقات الهاتف", "أداء التطبيق"]
    }
  },
  {
    id: '9',
    name: { en: "Baraa Hamza", ar: "براء حمزة" },
    role: { en: "Customer Support & Sales", ar: "الدعم والمبيعات" },
    roleType: "support",
    desc: {
      en: "Responsible for client account management and operations, ensuring data accuracy, resolving customer usage issues through meetings and guidance, and performing sales activities including contacting new or inactive clients. Shares operations and sales responsibilities with Reema when needed.",
      ar: "مسؤولة عن إدارة حسابات العملاء والخدمات التشغيلية، ضمان دقة البيانات، حل مشاكل العملاء المتعلقة بالاستخدام من خلال الاجتماعات والتوجيه، وأداء مهام المبيعات بما في ذلك التواصل مع العملاء الجدد أو غير النشطين. تشارك المهام التشغيلية والمبيعات مع ريما عند الحاجة."
    },
    details: {
      en: [
        "Client account management & updates",
        "Data selection for client dashboards",
        "Resolve customer usage issues",
        "Conduct client meetings and guidance",
        "Sales outreach to new or inactive clients",
        "Coordinate with Reema for task sharing"
      ],
      ar: [
        "إدارة حسابات العملاء وتحديثها",
        "اختيار البيانات المعروضة للعملاء",
        "حل مشاكل استخدام العملاء",
        "عقد اجتماعات العملاء وتوجيههم",
        "التواصل مع العملاء الجدد أو غير النشطين",
        "التنسيق مع ريما لتبادل المهام عند الحاجة"
      ]
    }
  },
  {
    id: '10',
    name: { en: "Reema Abdurahman", ar: "ريما عبد الرحمن" },
    role: { en: "Customer Support & Sales", ar: "الدعم والمبيعات" },
    roleType: "support",
    desc: {
      en: "Supports client account operations alongside Baraa, manages customer outreach, including new clients and inactive accounts, and conducts meetings to onboard or guide new users. Shares operations and sales responsibilities with Baraa as needed.",
      ar: "تدعم العمليات التشغيلية لحسابات العملاء بجانب براءه، تدير تواصل العملاء بما في ذلك العملاء الجدد والحسابات غير النشطة، وتعقد اجتماعات لتعريف المستخدمين الجدد بالنظام. تشارك المهام التشغيلية والمبيعات مع براءه عند الحاجة."
    },
    details: {
      en: [
        "Assist in client account operations",
        "Sales outreach to new or inactive clients",
        "Conduct meetings for onboarding new users",
        "Coordinate with Baraa for task sharing"
      ],
      ar: [
        "مساعدة في العمليات التشغيلية لحسابات العملاء",
        "التواصل مع العملاء الجدد أو غير النشطين",
        "عقد اجتماعات لتعريف المستخدمين الجدد بالنظام",
        "التنسيق مع براءه لتبادل المهام عند الحاجة"
      ]
    }
  },
  {
    id: '11',
    name: { en: "HebaTullah Ali", ar: "هبة الله علي" },
    role: { en: "Marketer", ar: "مسؤولة التسويق" },
    roleType: "pm",
    desc: {
      en: "Responsible for marketing strategy, content creation, sales guidance, advertising campaigns, and coordination with design teams.",
      ar: "مسؤولة عن استراتيجية التسويق، إنشاء المحتوى، توجيه فريق المبيعات، الحملات الإعلانية، والتنسيق مع فرق التصميم."
    },
    details: {
      en: ["Marketing strategy", "Content creation", "Sales team guidance", "Advertising campaigns", "Coordination with designers"],
      ar: ["استراتيجية التسويق", "إنشاء المحتوى", "توجيه فريق المبيعات", "الحملات الإعلانية", "التنسيق مع المصممين"]
    }
  },
  {
    id: '12',
    name: { en: "Haidy Hussein", ar: "هايدي حسين" },
    role: { en: "Graphic Designer", ar: "مصممة جرافيك" },
    roleType: "design",
    desc: {
      en: "Creates all visual materials, videos, presentations, and collaborates with marketing for brand consistency.",
      ar: "تصمم جميع المواد البصرية والفيديوهات والعروض التقديمية وتتعاون مع التسويق لضمان اتساق العلامة التجارية."
    },
    details: {
      en: ["Visual design", "Video content", "Presentation materials", "Collaboration with marketing"],
      ar: ["التصميم البصري", "محتوى الفيديو", "المواد التقديمية", "التعاون مع التسويق"]
    }
  }
];
