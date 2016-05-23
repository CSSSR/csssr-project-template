# CSSSR Project Template
**Шаблон проекта для быстрого старта**


## Старт проекта

### Склонируй репозиторий и перейди в папку проекта
```
git clone git@github.com:CSSSR/csssr-project-template.git new-project && cd new-project
```

### Установи модули
```
npm i
```

### Запусти шаблон
```
npm start
```


## Команды для запуска

### Запуск с отслеживанием изменений
```
npm start
```

### Создание нового блока
```
npm run make-block [имя-блока]
```

### Сборка в папку `dist`
```
npm run build
```

### Production cборка в папку `dist`
```
npm run production
```

### Локальный сервер на другом порте
```
PORT=9000 npm start
```

### Уведомления об ошибках `ESLint`
```
NOTIFY=true npm start
```

### Расшарить локальный сервер
```
TUNNEL=true npm start
```

### Открыть ссылку в браузере по умолчанию
```
OPEN=true npm start
```

### Собрать архив из папки `dist`
```
npm run zip
```

### Очистка папки `dist`
```
npm run clean
```

### Деплой всего содержимого папки `dist` в ветку `dist`
```
npm run deploy
```


## Структура папок и файлов
```
├── app/                       # Исходники
│   ├── blocks/                # Блоки
│   │   └── block/             # Блок
│   │       ├── block.jade     # Разметка блока
│   │       ├── block.js       # Скрипт блока
│   │       └── block.styl     # Стили блока
│   ├── data/                  # Данные в формате JSON
│   ├── pages/                 # Страницы
│   │   └── index.jade         # Разметка страницы
│   ├── icons/                 # SVG иконки для генерации векторного спрайта
│   ├── sprites/               # PNG иконки для генерации растрового спрайта
│   ├── resources/             # Статические файлы для копирования в dist
│   ├── scripts/               # Скрипты
│   │   └── app.js             # Главный скрипт
│   └── styles/                # Стили
│       ├── helpers/           # Помощники
│       │   ├── fonts.styl     # Подключение шрифтов
│       │   ├── mixins.styl    # Примеси
│       │   ├── optimize.styl  # Сброс стилей и фиксы
│       │   ├── svg-size.styl  # Переменные с размерами SVG иконок (автосборка)
│       │   └── variables.styl # Переменные
│       ├── sprites/           # Переменные с данными PNG спрайтов (автосборка)
│       └── app.styl           # Главный стилевой файл
├── dist/                      # Сборка (автогенерация)
│   ├── assets/                # Подключаемые ресурсы
│   │   ├── fonts/             # Шрифты
│   │   ├── images/            # Изображения
│   │   │   └── sprites/       # Спрайты (автогенерация)
│   │   ├── scripts/           # Скрипты
│   │   └── styles/            # Стили
│   └── index.html             # Страница
├── tasks/                     # Подключаемые скрипты с задачами для gulpfile.babel.js
│   ├── copy.js                # Копирование
│   ├── default.js             # Итоговые списки задач по умолчанию
│   ├── deploy.js              # Деплой в ветку dist
│   ├── icons.js               # Сборка SVG иконок в один файл
│   ├── scripts.js             # Сборка ES2015 скриптов в Webpack
│   ├── semver.js              # Обновление версии шаблона
│   ├── server.js              # Запуск локального сервера
│   ├── sprite.js              # Сборка спрайтов и CSS переменных
│   ├── styles.js              # Сборка стилей
│   ├── templates.js           # Сборка страниц из Jade шаблонов
│   ├── watch.js               # Отслеживание изменений и запуск задач
│   └── zip.js                 # Архивация папки dist
├── .csscomb.json              # Конфигурация форматирования CSS
├── .eslintrc                  # Конфигурация проверки JavaScript в ESLint
├── .editorconfig              # Конфигурация настроек редактора кода
├── .gitignore                 # Список исключённых файлов из Git
├── browserlist                # Список версий браузеров для Autoprefixer
├── gulpfile.babel.js          # Файл для запуска Gulp.js
├── make-block.js              # Утилита создания новых блоков
├── package.json               # Список модулей и прочей информации
├── readme.md                  # Документация шаблона
└── webpack.conf.js            # Конфигурация Webpack.js
```


## Как собираются и используются PNG спрайты

В шаблоне предусмотрена сборка нескольких PNG спрайтов и их данных в CSS переменные.

### Добавление PNG иконок

Для создания спрайта нужно добавить папку в `app/sprites` и в неё PNG иконки. Важно, чтобы иконки были с чётными высотой и шириной кратными двум. Retina иконки добавлять в эту папку рядом с обычными и в конце названия файла добавить `@2x`, например:
```
└── app/
    └── sprites/
        └── emoji/
            ├── grinning.png
            ├── grinning@2x.png
            ├── joy.png
            ├── joy@2x.png
            ├── smile.png
            └── smile@2x.png
```

### Сборка спрайта

* В папке `dist/assets/images/sprites` появятся два спрайта: обычный и Retina с `@2x` и в `app/styles/sprites` один стилевой файл с примесями. Все файлы будут с такими же названиями, как у папки, в которой находятся его иконки. Например:
```
├── app/
│    └── styles/
│       └── sprites/
│           └── emoji.styl
└── dist/
    └── assets/
        └── images/
            └── sprites/
                ├── emoji.png
                └── emoji@2x.png

```

* В сборочных папках останутся только актуальные спрайты и стили в случае, если удалить исходные папки с иконками.

### Использование спрайтов

#### Retina спрайты

Для подключения иконки используется примесь `retinaSprite` со значением `$icon_group`, где `icon` это название PNG иконки, например:
```css
.joy
    retinaSprite $joy_group
```

В собранном виде в CSS добавятся обычный спрайт и медиа-запрос, чтобы отображать Retina спрайт только при необходимости и это будет выглядеть так:
```css
.joy {
    background-image: url("../images/sprites/emoji.png");
    background-position: 32px 0px;
    width: 24px;
    height: 24px;
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .joy {
        background-image: url("../images/sprites/emoji@2x.png");
        background-size: 88px 24px;
    }
}
```

#### Обычные спрайты

Для подключения иконки используется примесь `sprite` со значением `$icon`, где `icon` это название PNG иконки, например:
```css
.joy
    sprite $joy
```

В собранном виде в CSS добавится только обычный спрайт и это будет выглядеть так:
```css
.joy {
    background-image: url("../images/sprites/emoji.png");
    background-position: 32px 0px;
    width: 24px;
    height: 24px;
}
```

## [Внеси свой вклад в развитие проекта!](https://github.com/CSSSR/csssr-project-template/blob/master/contributing.md)
