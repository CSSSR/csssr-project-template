# CSSSR Project Template
Шаблон проекта для быстрого старта.

### Инструменты
* `spritesmith` - генератор спрайтов и CSS переменных.
* `imagemin` - сжатие картинок.
* `stylus` - препроцессор CSS.
* `autoprefixer` - подстановка префиксов для заданных браузеров.
* `cssbeautifier` - форматирование CSS.
* `jade` - препроцессор HTML.
* `prettify` - форматирование HTML.
* `jshint` - проверка JavaScript на качество кода с подсказками.
* `copy` - создание копий файлов.
* `connect` - сервер проекта.
* `watch` - отслеживание изменений файлов и их компиляция.


### Подготовка к работе
1. Устанавливаем [Node.js](http://nodejs.org/download/), включающий в себя NPM (Node Packet Manager).
2. `npm i -g grunt-cli` - устанавливаем Grunt.
3. Ознакомьтесь со [статьей по установке git](http://git-scm.com/book/ru/Введение-Установка-Git) под Вашу операционную систему.

Эти 3 шага выполняются один раз.<br>
Если при вызове команды grunt будет писать ошибку, что эта команда не найдена, то нужно перезагрузиться или выйти из системы и зайти снова.


### Приступаем к работе
1. `git clone https://github.com/CSSSR/csssr-project-template.git new-project` - cкачать в папку `new-project`.
2. `npm i` - устанавливаем пакеты.
3. `grunt` - запускаем Grunt и работаем.

#### Структура папок

Папка | Назначение
--- | ---
`app` | Исходники.
`dist` | Сборка сайта для заказчика. Открывается по адресу [http://127.0.0.1:3000](http://127.0.0.1:3000).

Если нужна автоперезагрузка страницы после компиляции, то можно попробовать расширение [grunt-devtools](https://github.com/vladikoff/grunt-devtools) для Chrome.


### Полезные ссылки
* [grunt](http://gruntjs.com/)
* [jade](http://jade-lang.com/)
* [stylus](http://learnboost.github.io/stylus/)
* [Grunt для тех, кто считает штуки вроде него странными и сложными](http://frontender.info/grunt-is-not-weird-and-hard/)
* [Сборка сайтов на независимых блоках из Jade и Stylus с использованием Grunt.js](http://oleggromov.com/slides/independent-blocks-assemble/)
* [Grunt: система сборки для фронтенд-разработчиков](http://sapegin.ru/pres/grunt/)
