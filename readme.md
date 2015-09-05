# CSSSR Project Template
**Шаблон проекта для быстрого старта.**

## Старт проекта ...........................

* Склонируй репозиторий и перейди в папку проекта:

```
git clone git@github.com:CSSSR/csssr-project-template.git new-project && cd new-project
```

* Установи `gulp` глобально:

```bash
npm i -g gulp
```

* Установи зависимости:

```
npm i
```

* Запусти Gulp.js:

```
gulp
```

* Открой в браузере [`http://localhost:3000/`](http://localhost:3000/).

## Команды для запуска с Gulp.js

* Запуск Gulp с отслеживанием изменений:

```
gulp
```

* Сборка в папку `dist`:

```
gulp build
```

* Сборка в папку `dist` с добавлением файла `robots.txt` для запрета индексации:

```
gulp build --robots
```

* Локальный сервер на другом порте:

```
gulp --port=9000
```

* Собирать скрипты и стили без минификации:

```
gulp --debug
```

* Воспроизводить звук при ошибках:

```
gulp --beep
```

* Расшарить локальный сервер:

```
gulp --tunnel
```

* Открыть ссылку в браузере по умолчанию:

```
gulp --open
```

* Собрать архив из папки `dist`:

```
gulp zip
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
│   ├── sprite/                # PNG иконки для генерации растрового спрайта
│   ├── resources/             # Статические файлы для копирования в dist
│   ├── scripts/               # Скрипты
│   │   ├── app.js             # Главный скрипт
│   │   └── debug.js           # Идентификация отладки на локальном сервере
│   └── styles/                # Стили
│       ├── base/              # Базовые стили
│       │   ├── base.styl      # Базовый стилевой файл
│       │   ├── fonts.styl     # Подключение шрифтов
│       │   └── optimize.styl  # Сброс стилей и фиксы
│       ├── helpers/           # Помощники
│       │   ├── mixins.styl    # Примеси
│       │   ├── sprite.styl    # Переменные с данными PNG спрайта (автогенерация)
│       │   ├── svg.styl       # Переменные с данными SVG иконок (автогенерация)
│       │   └── variables.styl # Переменные
│       └── app.styl           # Главный стилевой файл
├── dist/                      # Сборка
│   ├── assets/                # Подключаемые ресурсы
│   │   ├── fonts/             # Шрифты
│   │   ├── images/            # Изображения
│   │   ├── scripts/           # Скрипты
│   │   └── styles/            # Стили
│   └── index.html             # Страница
├── gulp/                      # Подключаемые скрипты для gulpfile.coffee
│   ├── tasks/                 # Скрипты с задачами для Gulp.js
│   ├── utils/                 # Утилиты в помощь к задачам
│   └── paths.coffee           # Список путей для генерации файлов
├── .csscomb.json              # Конфигурация форматирования CSS
├── .eslintrc                  # Конфигурация проверки JavaScript в ESLint
├── .editorconfig              # Конфигурация настроек редактора кода
├── .gitignore                 # Список исключённых файлов из Git
├── gulpfile.coffee            # Файл для запуска Gulp.js
├── package.json               # Список модулей и прочей информации
└── readme.md                  # Документация шаблона
```
