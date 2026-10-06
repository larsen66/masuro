export type Locale = "GE" | "EN" | "RU";
export type HeroPage = "localization" | "animation" | "graphics";

export function formatProjectCount(count: number, locale: Locale) {
  if (locale === "EN") return `${count} ${count === 1 ? "project" : "projects"}`;
  if (locale === "RU") {
    const lastTwo = count % 100;
    const lastOne = count % 10;
    const form = lastTwo >= 11 && lastTwo <= 14 ? "проектов" : lastOne === 1 ? "проект" : lastOne >= 2 && lastOne <= 4 ? "проекта" : "проектов";
    return `${count} ${form}`;
  }
  return `${count} პროექტი`;
}

export const translations = {
  GE: {
    all: "სულ",
    projects: "ჩვენი პროექტები",
    photo: "ფოტო",
    image: "სურათი",
    video: "ვიდეო",
    clickToPlay: "დააჭირეთ გასაშვებად",
    previousImage: "წინა სურათი",
    nextImage: "შემდეგი სურათი",
    goToImage: "გადადით სურათზე",
    browserVideoSupport: "თქვენს ბრაუზერს ვიდეოს მხარდაჭერა არ აქვს.",
    hero: {
      localization: {
        before: "პროფესიონალური",
        highlight: "ვიდეო",
        after: "ლოკალიზაცია",
        description: "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია — ყველაფერი ერთ სივრცეში.",
      },
      animation: {
        before: "კრეატიული",
        highlight: "2D ანიმაცია",
        after: "",
        description: "მოძრაობა, რომელიც იპყრობს ყურადღებას. ჩვენი ანიმატორები ქმნიან უნიკალურ 2D ანიმაციებს თქვენი ბრენდისთვის.",
      },
      graphics: {
        before: "ვიზუალური",
        highlight: "გრაფიკა",
        after: "",
        description: "თანამედროვე გრაფიკული დიზაინი თქვენი ვიდეო კონტენტისთვის. მოშენ გრაფიკა, ტიტრები, ლოგოები და სხვა.",
      },
    },
  },
  EN: {
    all: "All",
    projects: "Our projects",
    photo: "Photo",
    image: "Image",
    video: "Video",
    clickToPlay: "Click to play",
    previousImage: "Previous image",
    nextImage: "Next image",
    goToImage: "Go to image",
    browserVideoSupport: "Your browser does not support video.",
    hero: {
      localization: {
        before: "Professional",
        highlight: "video",
        after: "localization",
        description: "We create high-quality video content for your brand. Dubbing, subtitles, graphics and animation — all in one place.",
      },
      animation: {
        before: "Creative",
        highlight: "2D animation",
        after: "",
        description: "Motion that captures attention. Our animators create unique 2D animations for your brand.",
      },
      graphics: {
        before: "Visual",
        highlight: "graphics",
        after: "",
        description: "Modern graphic design for your video content. Motion graphics, titles, logos and more.",
      },
    },
  },
  RU: {
    all: "Все",
    projects: "Наши проекты",
    photo: "Фото",
    image: "Изображение",
    video: "Видео",
    clickToPlay: "Нажмите для просмотра",
    previousImage: "Предыдущее изображение",
    nextImage: "Следующее изображение",
    goToImage: "Перейти к изображению",
    browserVideoSupport: "Ваш браузер не поддерживает видео.",
    hero: {
      localization: {
        before: "Профессиональная",
        highlight: "локализация",
        after: "видео",
        description: "Мы создаём качественный видеоконтент для вашего бренда. Дубляж, субтитры, графика и анимация — всё в одном месте.",
      },
      animation: {
        before: "Креативная",
        highlight: "2D-анимация",
        after: "",
        description: "Движение, которое привлекает внимание. Наши аниматоры создают уникальную 2D-анимацию для вашего бренда.",
      },
      graphics: {
        before: "Визуальная",
        highlight: "графика",
        after: "",
        description: "Современный графический дизайн для вашего видеоконтента: моушн-графика, титры, логотипы и многое другое.",
      },
    },
  },
} as const;
