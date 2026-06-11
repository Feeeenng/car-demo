import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Globe2,
  Menu,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Locale = "zh" | "en" | "ru" | "fr" | "es";

type TruckModel = {
  id: string;
  image: string;
  accent: string;
};

const truckModels: TruckModel[] = [
  {
    id: "ironhaul",
    image: `${import.meta.env.BASE_URL}trucks/ironhaul-720.png`,
    accent: "#e86f1d",
  },
  {
    id: "coldchain",
    image: `${import.meta.env.BASE_URL}trucks/coldchain-520.png`,
    accent: "#d9e2e7",
  },
  {
    id: "urbancarrier",
    image: `${import.meta.env.BASE_URL}trucks/urbancarrier-360.png`,
    accent: "#f09838",
  },
];

const languageOptions: { value: Locale; label: string }[] = [
  { value: "zh", label: "中文" },
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
  { value: "fr", label: "FR" },
  { value: "es", label: "ES" },
];

const localeLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  ru: "ru",
  fr: "fr",
  es: "es",
};

const copy = {
  zh: {
    meta: {
      brand: "曜衡重工",
      mark: "YH",
      showroom: "商用车展厅",
      nav: ["车型", "交付能力", "客户评价", "咨询报价"],
      menu: "菜单",
      close: "关闭",
      language: "语言",
    },
    hero: {
      eyebrow: "COMMERCIAL TRUCK SYSTEM",
      titleTop: "重载运输",
      titleBottom: "从选车到交付一次完成",
      subtitle:
        "面向城配、冷链、工程物资与干线车队，提供高承载货车、定制货厢、金融方案和交付保障。",
      primaryCta: "获取车队报价",
      secondaryCta: "查看热销车型",
      availability: "现车与改装排产可查",
    },
    stats: [
      { value: 18, suffix: "t", label: "最大总质量" },
      { value: 320, suffix: "km", label: "纯电续航" },
      { value: 21, suffix: "天", label: "最快交付" },
    ],
    carousel: {
      label: "主推车型",
      previous: "上一款车型",
      next: "下一款车型",
      viewDetails: "查看配置",
      models: {
        ironhaul: {
          name: "IronHaul 720 重载厢式车",
          type: "干线 / 工程物资",
          price: "¥ 368,000 起",
          summary: "强化车架、长轴距货厢和高扭矩动力，适合高频重载运输。",
          specs: [
            ["总质量", "18 t"],
            ["货厢长度", "7.2 m"],
            ["动力", "柴油 / 纯电"],
          ],
        },
        coldchain: {
          name: "ColdChain 520 冷链运输车",
          type: "生鲜 / 医药冷链",
          price: "¥ 298,000 起",
          summary: "一体化保温厢体与独立制冷机组，适合城市冷链配送。",
          specs: [
            ["温控范围", "-18°C 至 8°C"],
            ["货厢长度", "5.2 m"],
            ["交付周期", "21 天"],
          ],
        },
        urbancarrier: {
          name: "UrbanCarrier 360 城配货车",
          type: "城市配送 / 小批量周转",
          price: "¥ 176,000 起",
          summary: "紧凑轴距、低装卸高度和高利用率货箱，适合密集城区线路。",
          specs: [
            ["额定载重", "3.8 t"],
            ["货厢长度", "3.6 m"],
            ["能耗", "低至 18 kWh/100km"],
          ],
        },
      },
    },
    paramTags: [
      "承载能力 3.8-18t",
      "货厢长度 3.6-7.2m",
      "柴油 / 纯电 / 冷链",
      "全国交付与上牌协助",
      "三年核心部件质保",
    ],
    section: {
      modelsEyebrow: "HOT CONFIGURATIONS",
      modelsTitle: "热销车型，按业务场景配置",
      modelsSubtitle: "不是简单罗列参数，而是按车队用途、装载频次和交付周期筛选配置。",
      advantagesEyebrow: "DELIVERY SYSTEM",
      advantagesTitle: "采购、改装、交付由同一团队推进",
      reviewsEyebrow: "FLEET REFERENCES",
      reviewsTitle: "来自实际采购方的评价",
    },
    cards: [
      {
        title: "重载厢式运输",
        body: "适合建材、设备、工业备件运输，重点优化车架强度和长途稳定性。",
        specs: ["18t 总质量", "7.2m 货厢", "高扭矩动力"],
      },
      {
        title: "冷链专用车",
        body: "面向生鲜、医药和中央厨房配送，支持温区、厢体厚度和制冷机组选择。",
        specs: ["-18°C 温控", "保温厢体", "独立制冷"],
      },
      {
        title: "城市配送车",
        body: "适合商超、仓配和末端网点，高周转线路优先考虑能耗与装卸效率。",
        specs: ["低装卸高度", "紧凑转弯", "纯电可选"],
      },
    ],
    cardCta: "询问配置",
    advantages: [
      {
        title: "配置顾问",
        body: "按载重、线路、货物属性和上牌城市给出配置清单。",
      },
      {
        title: "改装协同",
        body: "厢体、尾板、冷机、侧门和固定装置统一排产。",
      },
      {
        title: "交付保障",
        body: "现车、金融、保险、上牌和司机交接节点透明可查。",
      },
      {
        title: "售后响应",
        body: "核心部件质保与车队维保计划同步交付。",
      },
    ],
    reviews: [
      {
        company: "华东区域冷链车队",
        quote:
          "我们最看重交付确定性。曜衡把冷机、厢体和金融排期放在同一张表里，采购决策快了很多。",
        name: "运营负责人 周先生",
      },
      {
        company: "工程物资承运商",
        quote:
          "重载车型的底盘和货厢配置讲得很细，试装数据也给得清楚，后续扩编车辆会继续对比他们的方案。",
        name: "车队经理 林女士",
      },
    ],
    cta: {
      title: "把运输场景发给我们，48 小时内返回车型与报价方案",
      body: "提交载重、线路、货物尺寸和交付城市，顾问会给出车型、货厢、动力和金融组合。",
      phoneLabel: "咨询电话",
      phone: "400-618-7200",
      primary: "预约配置顾问",
      secondary: "下载采购清单",
    },
    footer: {
      line: "高端商用货车销售与交付平台",
      rights: "© 2026 曜衡重工展厅",
    },
  },
  en: {
    meta: {
      brand: "YaoHeng Heavy",
      mark: "YH",
      showroom: "Heavy showroom",
      nav: ["Models", "Delivery", "References", "Quote"],
      menu: "Menu",
      close: "Close",
      language: "Language",
    },
    hero: {
      eyebrow: "COMMERCIAL TRUCK SYSTEM",
      titleTop: "Heavy-duty trucks",
      titleBottom: "for commercial fleets",
      subtitle:
        "Fleet-ready cargo, refrigerated, construction and urban delivery trucks configured with body customization, financing and delivery control.",
      primaryCta: "Get fleet pricing",
      secondaryCta: "View top models",
      availability: "Inventory and body-build slots available",
    },
    stats: [
      { value: 18, suffix: "t", label: "Gross weight" },
      { value: 320, suffix: "km", label: "EV range" },
      { value: 21, suffix: "days", label: "Fastest delivery" },
    ],
    carousel: {
      label: "Featured models",
      previous: "Previous model",
      next: "Next model",
      viewDetails: "View configuration",
      models: {
        ironhaul: {
          name: "IronHaul 720 Box Truck",
          type: "Trunk routes / industrial cargo",
          price: "From $50,800",
          summary: "Reinforced frame, long cargo body and high-torque powertrain for frequent heavy loads.",
          specs: [
            ["Gross weight", "18 t"],
            ["Body length", "7.2 m"],
            ["Powertrain", "Diesel / EV"],
          ],
        },
        coldchain: {
          name: "ColdChain 520 Refrigerated Truck",
          type: "Fresh goods / medical cold chain",
          price: "From $41,200",
          summary: "Integrated insulated body and independent refrigeration for urban cold-chain routes.",
          specs: [
            ["Temperature", "-18°C to 8°C"],
            ["Body length", "5.2 m"],
            ["Lead time", "21 days"],
          ],
        },
        urbancarrier: {
          name: "UrbanCarrier 360 Delivery Truck",
          type: "City delivery / fast turnover",
          price: "From $24,300",
          summary: "Compact wheelbase, low loading height and high-use cargo volume for dense city routes.",
          specs: [
            ["Payload", "3.8 t"],
            ["Body length", "3.6 m"],
            ["Energy use", "From 18 kWh/100km"],
          ],
        },
      },
    },
    paramTags: [
      "Payload 3.8-18t",
      "Body length 3.6-7.2m",
      "Diesel / EV / Refrigerated",
      "Nationwide delivery support",
      "3-year core warranty",
    ],
    section: {
      modelsEyebrow: "HOT CONFIGURATIONS",
      modelsTitle: "Top models configured by use case",
      modelsSubtitle: "Configurations are selected by route, load frequency and delivery timeline, not by empty specs.",
      advantagesEyebrow: "DELIVERY SYSTEM",
      advantagesTitle: "Purchase, body build and delivery managed together",
      reviewsEyebrow: "FLEET REFERENCES",
      reviewsTitle: "Feedback from commercial buyers",
    },
    cards: [
      {
        title: "Heavy box transport",
        body: "For equipment, construction material and industrial spare parts with frame strength and route stability prioritized.",
        specs: ["18t gross weight", "7.2m body", "High-torque drive"],
      },
      {
        title: "Refrigerated fleet truck",
        body: "For fresh goods, medical logistics and prepared food delivery with selectable body and cooling systems.",
        specs: ["-18°C control", "Insulated body", "Independent cooling"],
      },
      {
        title: "Urban delivery truck",
        body: "For retail, warehouse distribution and terminal routes where loading speed and energy use matter.",
        specs: ["Low loading floor", "Compact turning", "EV optional"],
      },
    ],
    cardCta: "Ask configuration",
    advantages: [
      {
        title: "Configuration advisory",
        body: "A model list based on payload, route, cargo type and registration city.",
      },
      {
        title: "Body-build coordination",
        body: "Cargo body, liftgate, refrigeration, side doors and fixtures scheduled together.",
      },
      {
        title: "Delivery control",
        body: "Inventory, financing, insurance, registration and handover milestones are visible.",
      },
      {
        title: "Service response",
        body: "Core warranty and fleet maintenance planning delivered with the vehicle.",
      },
    ],
    reviews: [
      {
        company: "East China cold-chain fleet",
        quote:
          "The value was delivery certainty. Refrigeration, body build and financing were placed on one timeline, so our decision moved faster.",
        name: "Operations Director, Zhou",
      },
      {
        company: "Industrial cargo carrier",
        quote:
          "The chassis and cargo body options were explained with load data. We will keep their plan in our next fleet expansion review.",
        name: "Fleet Manager, Lin",
      },
    ],
    cta: {
      title: "Send your transport scenario and receive a model plan within 48 hours",
      body: "Share payload, route, cargo dimensions and delivery city. Our advisor will return vehicle, body, powertrain and financing options.",
      phoneLabel: "Consultation line",
      phone: "400-618-7200",
      primary: "Book an advisor",
      secondary: "Download checklist",
    },
    footer: {
      line: "Premium commercial truck sales and delivery platform",
      rights: "© 2026 YaoHeng Heavy showroom",
    },
  },
  ru: {
    meta: {
      brand: "YaoHeng Heavy",
      mark: "YH",
      showroom: "Коммерческий шоурум",
      nav: ["Модели", "Поставка", "Отзывы", "Заявка"],
      menu: "Меню",
      close: "Закрыть",
      language: "Язык",
    },
    hero: {
      eyebrow: "КОММЕРЧЕСКИЕ ГРУЗОВИКИ",
      titleTop: "Грузовые машины",
      titleBottom: "для коммерческих парков",
      subtitle:
        "Готовые решения для городских, холодильных, строительных и магистральных перевозок с подбором кузова, финансированием и контролем поставки.",
      primaryCta: "Получить расчет",
      secondaryCta: "Смотреть модели",
      availability: "Склад и слоты на надстройки доступны",
    },
    stats: [
      { value: 18, suffix: " т", label: "Полная масса" },
      { value: 320, suffix: " км", label: "Запас хода EV" },
      { value: 21, suffix: " день", label: "Быстрая поставка" },
    ],
    carousel: {
      label: "Ключевые модели",
      previous: "Предыдущая модель",
      next: "Следующая модель",
      viewDetails: "Смотреть комплектацию",
      models: {
        ironhaul: {
          name: "IronHaul 720 фургон",
          type: "Магистраль / промышленные грузы",
          price: "от $50 800",
          summary: "Усиленная рама, длинный кузов и тяговая силовая линия для частых тяжелых рейсов.",
          specs: [
            ["Полная масса", "18 т"],
            ["Длина кузова", "7.2 м"],
            ["Силовая линия", "Дизель / EV"],
          ],
        },
        coldchain: {
          name: "ColdChain 520 рефрижератор",
          type: "Продукты / фармлогистика",
          price: "от $41 200",
          summary: "Изотермический кузов и независимая холодильная установка для городских холодовых маршрутов.",
          specs: [
            ["Температура", "-18°C до 8°C"],
            ["Длина кузова", "5.2 м"],
            ["Срок", "21 день"],
          ],
        },
        urbancarrier: {
          name: "UrbanCarrier 360 развозной",
          type: "Городская доставка / быстрый оборот",
          price: "от $24 300",
          summary: "Компактная база, низкая погрузка и полезный объем для плотных городских маршрутов.",
          specs: [
            ["Грузоподъемность", "3.8 т"],
            ["Длина кузова", "3.6 м"],
            ["Расход", "от 18 кВтч/100км"],
          ],
        },
      },
    },
    paramTags: [
      "Нагрузка 3.8-18 т",
      "Кузов 3.6-7.2 м",
      "Дизель / EV / рефрижератор",
      "Поставка и регистрация",
      "3 года гарантии на узлы",
    ],
    section: {
      modelsEyebrow: "ГОТОВЫЕ КОНФИГУРАЦИИ",
      modelsTitle: "Популярные модели под рабочие сценарии",
      modelsSubtitle: "Комплектации подбираются по маршруту, частоте загрузки и сроку поставки, а не по пустому списку параметров.",
      advantagesEyebrow: "СИСТЕМА ПОСТАВКИ",
      advantagesTitle: "Закупка, надстройка и поставка ведутся одной командой",
      reviewsEyebrow: "ОПЫТ АВТОПАРКОВ",
      reviewsTitle: "Отзывы коммерческих покупателей",
    },
    cards: [
      {
        title: "Тяжелый фургон",
        body: "Для оборудования, стройматериалов и промышленных запчастей с упором на раму и устойчивость на маршруте.",
        specs: ["18 т полная масса", "7.2 м кузов", "Тяговый привод"],
      },
      {
        title: "Рефрижератор для парка",
        body: "Для свежих продуктов, фармлогистики и готовой еды с выбором кузова и холодильной установки.",
        specs: ["-18°C контроль", "Изотермия", "Автономный холод"],
      },
      {
        title: "Городская доставка",
        body: "Для ритейла, складской доставки и конечных маршрутов, где важны скорость погрузки и расход.",
        specs: ["Низкая погрузка", "Малый радиус", "EV опция"],
      },
    ],
    cardCta: "Запросить подбор",
    advantages: [
      {
        title: "Консультация по комплектации",
        body: "Список моделей по нагрузке, маршруту, грузу и городу регистрации.",
      },
      {
        title: "Координация надстройки",
        body: "Кузов, гидроборт, холод, боковые двери и крепления планируются вместе.",
      },
      {
        title: "Контроль поставки",
        body: "Склад, финансирование, страхование, регистрация и передача видны по этапам.",
      },
      {
        title: "Сервисная поддержка",
        body: "Гарантия на ключевые узлы и план обслуживания передаются вместе с машиной.",
      },
    ],
    reviews: [
      {
        company: "Холодильный автопарк Восточного Китая",
        quote:
          "Главным была предсказуемая поставка. Холод, кузов и финансирование стояли в одном графике, поэтому решение приняли быстрее.",
        name: "Директор по операциям, Чжоу",
      },
      {
        company: "Перевозчик промышленных грузов",
        quote:
          "Шасси и кузов разобрали по данным нагрузки. Их вариант останется в сравнении при следующем расширении парка.",
        name: "Менеджер автопарка, Линь",
      },
    ],
    cta: {
      title: "Опишите маршрут, и за 48 часов мы подготовим модель и расчет",
      body: "Укажите нагрузку, маршрут, размеры груза и город поставки. Консультант вернет варианты машины, кузова, силовой линии и финансирования.",
      phoneLabel: "Линия консультации",
      phone: "400-618-7200",
      primary: "Записаться к консультанту",
      secondary: "Скачать чек-лист",
    },
    footer: {
      line: "Платформа продаж и поставки коммерческих грузовиков",
      rights: "© 2026 шоурум YaoHeng Heavy",
    },
  },
  fr: {
    meta: {
      brand: "YaoHeng Heavy",
      mark: "YH",
      showroom: "Showroom utilitaire",
      nav: ["Modèles", "Livraison", "Références", "Devis"],
      menu: "Menu",
      close: "Fermer",
      language: "Langue",
    },
    hero: {
      eyebrow: "CAMIONS PROFESSIONNELS",
      titleTop: "Camions industriels",
      titleBottom: "pour flottes professionnelles",
      subtitle:
        "Des camions cargo, frigorifiques, chantier et livraison urbaine avec carrosserie adaptée, financement et suivi de livraison.",
      primaryCta: "Obtenir un devis",
      secondaryCta: "Voir les modèles",
      availability: "Stock et créneaux de carrosserie disponibles",
    },
    stats: [
      { value: 18, suffix: " t", label: "PTAC maximal" },
      { value: 320, suffix: " km", label: "Autonomie EV" },
      { value: 21, suffix: " jours", label: "Livraison rapide" },
    ],
    carousel: {
      label: "Modèles phares",
      previous: "Modèle précédent",
      next: "Modèle suivant",
      viewDetails: "Voir la configuration",
      models: {
        ironhaul: {
          name: "IronHaul 720 fourgon",
          type: "Longue distance / fret industriel",
          price: "Dès 50 800 $",
          summary: "Châssis renforcé, caisse longue et motorisation à fort couple pour charges lourdes fréquentes.",
          specs: [
            ["PTAC", "18 t"],
            ["Longueur caisse", "7.2 m"],
            ["Motorisation", "Diesel / EV"],
          ],
        },
        coldchain: {
          name: "ColdChain 520 frigorifique",
          type: "Frais / chaîne du froid médicale",
          price: "Dès 41 200 $",
          summary: "Caisse isolée intégrée et groupe froid indépendant pour tournées urbaines sous température.",
          specs: [
            ["Température", "-18°C à 8°C"],
            ["Longueur caisse", "5.2 m"],
            ["Délai", "21 jours"],
          ],
        },
        urbancarrier: {
          name: "UrbanCarrier 360 livraison",
          type: "Distribution urbaine / rotation rapide",
          price: "Dès 24 300 $",
          summary: "Empattement compact, seuil bas et volume utile optimisé pour les lignes urbaines denses.",
          specs: [
            ["Charge utile", "3.8 t"],
            ["Longueur caisse", "3.6 m"],
            ["Énergie", "Dès 18 kWh/100km"],
          ],
        },
      },
    },
    paramTags: [
      "Charge 3.8-18 t",
      "Caisse 3.6-7.2 m",
      "Diesel / EV / frigorifique",
      "Livraison et immatriculation",
      "Garantie organes 3 ans",
    ],
    section: {
      modelsEyebrow: "CONFIGURATIONS CLÉS",
      modelsTitle: "Modèles vendus selon vos usages",
      modelsSubtitle: "Les configurations sont choisies par route, fréquence de charge et délai de livraison, pas par une fiche technique isolée.",
      advantagesEyebrow: "SYSTÈME DE LIVRAISON",
      advantagesTitle: "Achat, carrosserie et livraison pilotés ensemble",
      reviewsEyebrow: "RÉFÉRENCES FLOTTES",
      reviewsTitle: "Avis d’acheteurs professionnels",
    },
    cards: [
      {
        title: "Fourgon lourd",
        body: "Pour équipements, matériaux et pièces industrielles avec priorité au châssis et à la stabilité en ligne.",
        specs: ["18 t PTAC", "Caisse 7.2 m", "Fort couple"],
      },
      {
        title: "Camion frigorifique",
        body: "Pour produits frais, santé et restauration collective avec choix de caisse et groupe froid.",
        specs: ["Contrôle -18°C", "Caisse isolée", "Froid indépendant"],
      },
      {
        title: "Livraison urbaine",
        body: "Pour retail, entrepôts et derniers kilomètres, où vitesse de chargement et énergie comptent.",
        specs: ["Seuil bas", "Braquage compact", "EV en option"],
      },
    ],
    cardCta: "Demander une config",
    advantages: [
      {
        title: "Conseil configuration",
        body: "Liste de modèles selon charge, route, marchandise et ville d’immatriculation.",
      },
      {
        title: "Coordination carrosserie",
        body: "Caisse, hayon, froid, portes latérales et arrimage sont planifiés ensemble.",
      },
      {
        title: "Suivi de livraison",
        body: "Stock, financement, assurance, immatriculation et remise sont visibles par jalon.",
      },
      {
        title: "Réponse service",
        body: "Garantie des organes clés et plan d’entretien flotte livrés avec le véhicule.",
      },
    ],
    reviews: [
      {
        company: "Flotte froid Est de la Chine",
        quote:
          "La valeur était la certitude de livraison. Froid, carrosserie et financement étaient dans un seul planning, ce qui a accéléré la décision.",
        name: "Directeur des opérations, Zhou",
      },
      {
        company: "Transporteur de fret industriel",
        quote:
          "Les options châssis et caisse ont été expliquées avec les données de charge. Leur plan restera dans notre prochain comparatif flotte.",
        name: "Responsable flotte, Lin",
      },
    ],
    cta: {
      title: "Envoyez votre scénario, recevez un plan camion sous 48 heures",
      body: "Partagez charge, route, dimensions et ville de livraison. Notre conseiller proposera véhicule, caisse, motorisation et financement.",
      phoneLabel: "Ligne conseil",
      phone: "400-618-7200",
      primary: "Réserver un conseiller",
      secondary: "Télécharger la liste",
    },
    footer: {
      line: "Plateforme de vente et livraison de camions professionnels",
      rights: "© 2026 showroom YaoHeng Heavy",
    },
  },
  es: {
    meta: {
      brand: "YaoHeng Heavy",
      mark: "YH",
      showroom: "Showroom comercial",
      nav: ["Modelos", "Entrega", "Referencias", "Cotizar"],
      menu: "Menú",
      close: "Cerrar",
      language: "Idioma",
    },
    hero: {
      eyebrow: "CAMIONES COMERCIALES",
      titleTop: "Camiones pesados",
      titleBottom: "para flotas comerciales",
      subtitle:
        "Camiones de carga, refrigerados, obra y reparto urbano con carrocería a medida, financiación y control de entrega.",
      primaryCta: "Solicitar cotización",
      secondaryCta: "Ver modelos",
      availability: "Stock y cupos de carrocería disponibles",
    },
    stats: [
      { value: 18, suffix: " t", label: "Peso bruto" },
      { value: 320, suffix: " km", label: "Autonomía EV" },
      { value: 21, suffix: " días", label: "Entrega rápida" },
    ],
    carousel: {
      label: "Modelos destacados",
      previous: "Modelo anterior",
      next: "Modelo siguiente",
      viewDetails: "Ver configuración",
      models: {
        ironhaul: {
          name: "IronHaul 720 furgón",
          type: "Ruta larga / carga industrial",
          price: "Desde $50,800",
          summary: "Bastidor reforzado, caja larga y tren motriz de alto par para cargas pesadas frecuentes.",
          specs: [
            ["Peso bruto", "18 t"],
            ["Largo de caja", "7.2 m"],
            ["Tren motriz", "Diésel / EV"],
          ],
        },
        coldchain: {
          name: "ColdChain 520 refrigerado",
          type: "Frescos / cadena fría médica",
          price: "Desde $41,200",
          summary: "Caja aislada integrada y equipo de frío independiente para rutas urbanas refrigeradas.",
          specs: [
            ["Temperatura", "-18°C a 8°C"],
            ["Largo de caja", "5.2 m"],
            ["Plazo", "21 días"],
          ],
        },
        urbancarrier: {
          name: "UrbanCarrier 360 reparto",
          type: "Distribución urbana / alta rotación",
          price: "Desde $24,300",
          summary: "Distancia entre ejes compacta, piso bajo y volumen útil para rutas urbanas densas.",
          specs: [
            ["Carga útil", "3.8 t"],
            ["Largo de caja", "3.6 m"],
            ["Consumo", "Desde 18 kWh/100km"],
          ],
        },
      },
    },
    paramTags: [
      "Carga 3.8-18 t",
      "Caja 3.6-7.2 m",
      "Diésel / EV / refrigerado",
      "Entrega y registro",
      "Garantía central 3 años",
    ],
    section: {
      modelsEyebrow: "CONFIGURACIONES CLAVE",
      modelsTitle: "Modelos vendidos por escenario de uso",
      modelsSubtitle: "Las configuraciones se seleccionan por ruta, frecuencia de carga y fecha de entrega, no por una ficha aislada.",
      advantagesEyebrow: "SISTEMA DE ENTREGA",
      advantagesTitle: "Compra, carrocería y entrega gestionadas juntas",
      reviewsEyebrow: "REFERENCIAS DE FLOTA",
      reviewsTitle: "Opiniones de compradores comerciales",
    },
    cards: [
      {
        title: "Transporte pesado",
        body: "Para equipos, materiales de obra y repuestos industriales, con prioridad en bastidor y estabilidad de ruta.",
        specs: ["18 t peso bruto", "Caja 7.2 m", "Alto par"],
      },
      {
        title: "Camión refrigerado",
        body: "Para frescos, salud y comida preparada, con selección de caja y sistema de refrigeración.",
        specs: ["Control -18°C", "Caja aislada", "Frío independiente"],
      },
      {
        title: "Reparto urbano",
        body: "Para retail, almacenes y última milla, donde carga rápida y consumo definen el costo.",
        specs: ["Piso bajo", "Giro compacto", "EV opcional"],
      },
    ],
    cardCta: "Pedir configuración",
    advantages: [
      {
        title: "Asesoría de configuración",
        body: "Lista de modelos según carga, ruta, tipo de mercancía y ciudad de registro.",
      },
      {
        title: "Coordinación de carrocería",
        body: "Caja, plataforma, frío, puertas laterales y anclajes se programan en conjunto.",
      },
      {
        title: "Control de entrega",
        body: "Stock, financiación, seguro, registro y entrega son visibles por hitos.",
      },
      {
        title: "Respuesta posventa",
        body: "Garantía de componentes centrales y plan de mantenimiento se entregan con el vehículo.",
      },
    ],
    reviews: [
      {
        company: "Flota refrigerada del este de China",
        quote:
          "Lo clave fue la certeza de entrega. Frío, carrocería y financiación estaban en una sola línea de tiempo, y decidimos más rápido.",
        name: "Director de operaciones, Zhou",
      },
      {
        company: "Transportista de carga industrial",
        quote:
          "Las opciones de chasis y caja se explicaron con datos de carga. Mantendremos su plan en la próxima revisión de flota.",
        name: "Gerente de flota, Lin",
      },
    ],
    cta: {
      title: "Envíe su escenario y reciba un plan de modelo en 48 horas",
      body: "Comparta carga, ruta, dimensiones y ciudad de entrega. Un asesor devolverá opciones de vehículo, caja, tren motriz y financiación.",
      phoneLabel: "Línea de consulta",
      phone: "400-618-7200",
      primary: "Reservar asesor",
      secondary: "Descargar lista",
    },
    footer: {
      line: "Plataforma de venta y entrega de camiones comerciales",
      rights: "© 2026 showroom YaoHeng Heavy",
    },
  },
} as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function CountUp({
  value,
  suffix,
  className,
}: {
  value: number;
  suffix: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => setDisplay(latest));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.3,
      ease: "easeOut",
    });
    return controls.stop;
  }, [inView, motionValue, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = copy[locale];
  const activeTruck = truckModels[active];
  const activeTruckCopy = t.carousel.models[activeTruck.id as keyof typeof t.carousel.models];

  useEffect(() => {
    document.documentElement.lang = localeLang[locale];
  }, [locale]);

  const nextTruck = () => setActive((current) => (current + 1) % truckModels.length);
  const previousTruck = () =>
    setActive((current) => (current - 1 + truckModels.length) % truckModels.length);

  return (
    <div className="industrial-shell">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/88 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label={t.meta.brand}>
            <span className="grid h-11 w-11 place-items-center rounded-md border border-orange-industrial/25 bg-orange-industrial text-sm font-black text-white shadow-[0_12px_28px_rgba(232,111,29,0.22)]">
              {t.meta.mark}
            </span>
            <span className="flex flex-col">
              <span className="font-display text-lg font-semibold uppercase tracking-[0.16em] text-slate-950">
                {t.meta.brand}
              </span>
              <span className="text-[11px] uppercase tracking-[0.26em] text-muted-foreground">
                {t.meta.showroom}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {t.meta.nav.map((item) => (
              <a
                className="text-sm font-medium text-muted-foreground transition hover:text-slate-950"
                href={item === t.meta.nav[0] ? "#models" : item === t.meta.nav[1] ? "#delivery" : item === t.meta.nav[2] ? "#reviews" : "#contact"}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Tabs value={locale} onValueChange={(value) => setLocale(value as Locale)}>
              <TabsList aria-label={t.meta.language}>
                {languageOptions.map((option) => (
                  <TabsTrigger className="px-2.5" key={option.value} value={option.value}>
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button size="sm" asChild>
              <a href="#contact">
                <Phone className="h-4 w-4" />
                {t.cta.primary}
              </a>
            </Button>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-950 shadow-[0_12px_24px_rgba(71,85,95,0.08)] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
            aria-label={mobileOpen ? t.meta.close : t.meta.menu}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {t.meta.nav.map((item) => (
                <a
                  className="rounded-md border border-slate-200 px-4 py-3 text-sm text-muted-foreground"
                  href={item === t.meta.nav[0] ? "#models" : item === t.meta.nav[1] ? "#delivery" : item === t.meta.nav[2] ? "#reviews" : "#contact"}
                  key={item}
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Tabs value={locale} onValueChange={(value) => setLocale(value as Locale)}>
                <TabsList className="w-full justify-center" aria-label={t.meta.language}>
                  {languageOptions.map((option) => (
                    <TabsTrigger className="flex-1" key={option.value} value={option.value}>
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="pointer-events-none absolute left-0 top-28 h-px w-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-44 h-px w-1/3 bg-gradient-to-r from-transparent via-orange-industrial/35 to-transparent" />
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.82fr_1.5fr]">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <Badge className="mb-6">{t.hero.eyebrow}</Badge>
              </motion.div>

              <h1
                className={cn(
                  "text-balance font-display text-[3.35rem] font-black uppercase leading-[0.94] text-slate-950 sm:text-6xl",
                  locale === "zh" ? "lg:text-7xl" : "lg:text-[4.15rem]",
                )}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 }}
                >
                  {t.hero.titleTop}
                </motion.span>
                <motion.span
                  className="mt-2 block text-slate-500"
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {t.hero.titleBottom}
                </motion.span>
              </h1>

              <motion.p
                className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:mt-7 sm:text-lg"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.34 }}
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                className="mt-8 hidden flex-col gap-3 sm:flex-row lg:flex"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.46 }}
              >
                <HeroActions primary={t.hero.primaryCta} secondary={t.hero.secondaryCta} />
              </motion.div>

              <motion.div
                className="mt-10 hidden max-w-lg grid-cols-3 border-y border-slate-200 lg:grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.58 }}
              >
                <StatsGrid stats={t.stats} />
              </motion.div>
            </div>

            <motion.div
              className="product-stage relative min-h-[760px] sm:min-h-[720px] lg:min-h-[640px]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="product-stage-plate absolute inset-x-3 bottom-16 top-8 rounded-lg border border-slate-300/80 bg-gradient-to-br from-white via-[#eef1f2] to-[#dce3e7] lg:bottom-9" />
              <div className="product-stage-glow absolute inset-x-8 bottom-7 h-32 rounded-[50%] bg-gradient-to-r from-transparent via-slate-500/24 to-orange-industrial/16" />
              <div className="product-stage-rim absolute left-6 top-5 h-24 w-px bg-orange-industrial/70" />
              <div className="product-stage-rim absolute right-10 top-12 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-16 bg-orange-industrial" />
                {t.carousel.label}
              </div>

              <div className="product-stage-image absolute inset-x-0 top-2 z-10 flex h-[45%] items-center justify-center overflow-hidden rounded-lg sm:h-[50%] lg:h-[73%]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={activeTruck.id}
                    src={activeTruck.image}
                    alt={activeTruckCopy.name}
                    className="w-[136%] max-w-none object-contain drop-shadow-[0_42px_42px_rgba(71,85,95,0.28)] sm:w-[126%] lg:w-[120%]"
                    initial={{ opacity: 0, x: 92, y: -18, scale: 0.94, rotate: -3.2, rotateY: -8 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1.025, rotate: -1.2, rotateY: 0 }}
                    exit={{ opacity: 0, x: -82, y: 12, scale: 1.08, rotate: 2.2, rotateY: 7 }}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </div>

              <div className="product-stage-card absolute bottom-0 left-0 right-0 z-20 mx-auto max-w-[92%] rounded-lg border border-slate-300/90 bg-white p-4 shadow-[0_26px_70px_rgba(71,85,95,0.16)] sm:bg-white/94 sm:p-6 lg:bottom-0 lg:max-w-[86%]">
                <div className="flex flex-col gap-3 sm:gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <Badge variant="steel" className="mb-3">
                      {activeTruckCopy.type}
                    </Badge>
                    <h2 className="font-display text-[1.55rem] font-black uppercase leading-tight text-slate-950 sm:text-3xl lg:text-[1.65rem]">
                      {activeTruckCopy.name}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {activeTruckCopy.summary}
                    </p>
                  </div>
                  <div className="shrink-0 text-left md:text-right">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {t.hero.availability}
                    </p>
                    <p className="mt-1 font-display text-2xl font-black text-orange-industrial">
                      {activeTruckCopy.price}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3">
                  {activeTruckCopy.specs.map(([label, value]) => (
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" key={label}>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-slate-950">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
                  <Button variant="outline" size="sm" asChild>
                    <a href="#contact">{t.carousel.viewDetails}</a>
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      aria-label={t.carousel.previous}
                      size="icon"
                      variant="outline"
                      onClick={previousTruck}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex gap-2">
                      {truckModels.map((model, index) => (
                        <button
                          aria-label={`${t.carousel.label} ${index + 1}`}
                          className={cn(
                            "h-2.5 w-8 rounded-sm bg-slate-300 transition-all",
                            active === index && "bg-orange-industrial",
                          )}
                          key={model.id}
                          onClick={() => setActive(index)}
                          type="button"
                        />
                      ))}
                    </div>
                    <Button
                      aria-label={t.carousel.next}
                      size="icon"
                      variant="outline"
                      onClick={nextTruck}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mx-auto mt-8 max-w-7xl lg:hidden">
            <HeroActions primary={t.hero.primaryCta} secondary={t.hero.secondaryCta} />
            <div className="mt-8 grid grid-cols-3 border-y border-slate-200">
              <StatsGrid stats={t.stats} />
            </div>
          </div>

          <div className="mx-auto mt-12 flex max-w-7xl flex-wrap gap-3">
            {t.paramTags.map((tag) => (
              <Badge variant="muted" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        <RevealSection id="models" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.section.modelsEyebrow}
            title={t.section.modelsTitle}
            subtitle={t.section.modelsSubtitle}
          />
          <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-3">
            {t.cards.map((card, index) => (
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                key={card.title}
              >
                <Card className="group h-full overflow-hidden bg-white/90 transition duration-300 hover:-translate-y-1 hover:border-orange-industrial/45">
                  <div className="h-1 bg-gradient-to-r from-orange-industrial via-[#f2a15c] to-transparent" />
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-orange-industrial/25 bg-orange-industrial/10 text-orange-industrial">
                      {index === 0 ? (
                        <Gauge className="h-5 w-5" />
                      ) : index === 1 ? (
                        <PackageCheck className="h-5 w-5" />
                      ) : (
                        <Truck className="h-5 w-5" />
                      )}
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.body}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {card.specs.map((spec) => (
                        <Badge variant="steel" key={spec}>
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <Button className="mt-6 w-full" variant="outline" asChild>
                      <a href="#contact">
                        {t.cardCta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="delivery" className="border-y border-slate-200 bg-[#f1f3f4]/80 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <SectionHeading
              align="left"
              eyebrow={t.section.advantagesEyebrow}
              title={t.section.advantagesTitle}
            />
            <div className="grid gap-3">
              {t.advantages.map((item, index) => (
                <motion.div
                  className="steel-panel flex flex-col gap-4 rounded-lg p-5 sm:flex-row sm:items-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  key={item.title}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-orange-industrial/35 bg-orange-industrial/10 text-[#ffad73]">
                    {index === 0 ? (
                      <Wrench className="h-5 w-5" />
                    ) : index === 1 ? (
                      <PackageCheck className="h-5 w-5" />
                    ) : index === 2 ? (
                      <Truck className="h-5 w-5" />
                    ) : (
                      <ShieldCheck className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold uppercase text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                  <span className="hidden font-display text-3xl font-black text-slate-300/80 sm:block">
                    0{index + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection id="reviews" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.section.reviewsEyebrow} title={t.section.reviewsTitle} />
          <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-2">
            {t.reviews.map((review, index) => (
              <motion.figure
                className="steel-panel rounded-lg p-6"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                key={review.company}
              >
                <figcaption className="font-display text-sm font-bold uppercase tracking-[0.16em] text-orange-industrial">
                  {review.company}
                </figcaption>
                <blockquote className="mt-5 text-lg leading-8 text-slate-950">"{review.quote}"</blockquote>
                <Separator className="my-5" />
                <p className="text-sm text-muted-foreground">{review.name}</p>
              </motion.figure>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="contact" className="px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <div className="orange-rule mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-[0_26px_70px_rgba(71,85,95,0.12)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <Badge>{t.cta.phoneLabel}</Badge>
                <h2 className="mt-5 max-w-3xl font-display text-3xl font-black uppercase leading-tight text-slate-950 sm:text-4xl">
                  {t.cta.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                  {t.cta.body}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.cta.phoneLabel}
                </p>
                <p className="mt-2 font-display text-4xl font-black text-slate-950">{t.cta.phone}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <Button asChild>
                    <a href={`tel:${t.cta.phone.replace(/-/g, "")}`}>
                      <Phone className="h-4 w-4" />
                      {t.cta.primary}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#models">
                      {t.cta.secondary}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </main>

      <footer className="border-t border-slate-200 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.line}</p>
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4" />
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RevealSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      {children}
    </motion.section>
  );
}

function HeroActions({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button size="lg" asChild>
        <a href="#contact">
          {primary}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <a href="#models">
          <Truck className="h-4 w-4" />
          {secondary}
        </a>
      </Button>
    </div>
  );
}

function StatsGrid({
  stats,
}: {
  stats: readonly { value: number; suffix: string; label: string }[];
}) {
  return (
    <>
      {stats.map((stat, index) => (
        <div
          className={cn(
            "py-5",
            index > 0 && "border-l border-slate-200 pl-4 sm:pl-5",
            index === 0 && "pr-3 sm:pr-4",
          )}
          key={stat.label}
        >
          <CountUp
            value={stat.value}
            suffix={stat.suffix}
            className="font-display text-2xl font-black text-slate-950 sm:text-3xl"
          />
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left")}>
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-5 font-display text-3xl font-black uppercase leading-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-7 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export default App;
