# CSSSR Project Template
Шаблон проекта для быстрого старта.

### Инструменты
* `concat` - объединение скриптов в один файл.
* `uglify` - обфускация кода.
* `jade` - препроцессор html.
* `stylus` - препроцессор css.
* `autoprefixer` - подстановка префиксов для заданных браузеров.
* `imagemin` - сжатие картинок.
* `connect` - сервер приложения.
* `watch` - отслеживание изменений файлов и их компиляция.
* `livereload` - перезагрузка страницы после компиляции файлов.


### Подготовка к работе
1. Устанавливаем [Node.js](http://nodejs.org/download/), включающий в себя NPM (Node Packet Manager).
2. `npm install -g grunt` - устанавливаем Grunt.
3. Ознакомьтесь со [статьей по установке git](http://git-scm.com/book/ru/Введение-Установка-Git) под Вашу операционную систему.

Эти 3 шага выполняются один раз.<br>
Если при вызове команды grunt будет писать ошибку, что эта команда не найдена, то нужно перезагрузиться или выйти из системы и зайти снова.


### Приступаем к работе
1. `git clone https://github.com/CSSSR/csssr-project-template.git new-project` - cкачать в папку `new-project`
2. `npm install` - устанавливаем пакеты
3. `grunt` - запускаем и работаем

Исходники находятся в папке `src`, готовые файлы - в папке `dest`.<br>
Проект доступен по адресу: `127.0.0.1:3000`.<br>
В проект уже включен скрипт LiveReload.<br>
Для новых страниц добавьте скрипт перед закрывающим тегом `</body>`:
```html
<script src="//localhost:35729/livereload.js"></script>
```


### Полезные ссылки
* [grunt](http://gruntjs.com/)
* [jade](http://jade-lang.com/)
* [stylus](http://learnboost.github.io/stylus/)
* [Grunt для тех, кто считает штуки вроде него странными и сложными](http://frontender.info/grunt-is-not-weird-and-hard/)
* [Сборка сайтов на независимых блоках из Jade и Stylus с использованием Grunt.js](http://oleggromov.com/slides/independent-blocks-assemble/)
* [Grunt: система сборки для фронтенд-разработчиков](http://sapegin.ru/pres/grunt/)
