'use strict';

/**
 * Класс Book представляет книгу с названием, годом публикации и ценой
 */
class Book {
    /**
     * Конструктор класса Book
     * @param {string} title - Название книги (непустая строка)
     * @param {number} pubYear - Год публикации (положительное целое число)
     * @param {number} price - Цена книги (положительное число)
     */
    constructor(title, pubYear, price) {
        this.title = title;
        this.pubYear = pubYear;
        this.price = price;
    }

    // Геттер для названия книги
    get title() {
        return this._title;
    }

    // Сеттер для названия книги с валидацией
    set title(text) {
        if (typeof text !== 'string' || text.trim() === '') {
            throw new Error('Title must be a non-empty string.');
        }
        this._title = text.trim();
    }

    // Геттер для года публикации
    get pubYear() {
        return this._pubYear;
    }

    // Сеттер для года публикации с валидацией
    set pubYear(newPubYear) {
        if (typeof newPubYear !== 'number' || newPubYear <= 0 || !Number.isInteger(newPubYear)) {
            throw new Error('pubYear must be a positive integer.');
        }
        this._pubYear = newPubYear;
    }

    // Геттер для цены
    get price() {
        return this._price;
    }

    // Сеттер для цены с валидацией
    set price(newPrice) {
        if (typeof newPrice !== 'number' || newPrice <= 0) {
            throw new Error('Price must be a positive number.');
        }
        this._price = newPrice;
    }

    /**
     * Выводит информацию о книге в консоль
     * @return {void}
     */
    show() {
        console.log(`Название: ${this._title},
Год публикации: ${this._pubYear},
Цена: ${this._price}`);
    }

    /**
     * Статический метод для сравнения книг по году публикации
     * @param {Book} book1 - Первая книга для сравнения
     * @param {Book} book2 - Вторая книга для сравнения
     * @return {number} Разница между годами публикации (book1 - book2)
     */
    static compare(book1, book2) {
        return book1.pubYear - book2.pubYear;
    }
}

/**
 * Возвращает текущее время в формате ЧЧ:ММ:СС (без учета локали)
 * @return {string} Строка с текущим временем
 */
function getFixedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Форматирует дату в формате ДД.ММ.ГГГГ (без учета локали)
 * @param {Date} date - Объект Date для форматирования
 * @return {string} Отформатированная строка с датой
 */
function formatDateFixed(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

try {
    console.log(`Текущее время: ${getFixedTime()}`);
    
    // Создание и демонстрация работы с книгами
    let book1 = new Book('1984', 1949, 1000);
    book1.show();
    book1.price = 1900;
    book1.show();

    console.log("Цена book1:", book1.price);

    let book2 = new Book('To Kill a Mockingbird', 1960, 890);
    book2.show();
    let book3 = new Book('1984', 1949, 250);
    book3.show();

    // Сортировка книг по году публикации
    let books = [book1, book2, book3];
    books.sort(Book.compare);
    console.log("Книги после сортировки по году издания:");
    for (let i = 0; i < books.length; ++i) {
        books[i].show();
    }

    /**
     * Проверяет, является ли объект пустым
     * @param {Object} obj - Объект для проверки
     * @return {boolean} True если объект пустой, false если содержит свойства
     */
    function isEmpty(obj) {
        if (typeof obj !== 'object' || obj === null) return true;

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return Object.getOwnPropertySymbols(obj).length === 0;
    }

    // Примеры проверки пустых объектов
    let obj1 = { [Symbol()]: true };
    let obj2 = {};

    console.log("Объект 1", isEmpty(obj1));
    console.log("Объект 2", isEmpty(obj2));

    // Объект для работы с классами
    let classObject = {
        className: "open menu",

        /**
         * Добавляет класс к строке классов
         * @param {string} cls - Класс для добавления
         * @return {Object} Возвращает this для цепочки вызовов
         */
        addClass(cls) {
            let classes = this.className.split(' ');
            if (!classes.includes(cls)) {
                this.className += " " + cls;
            }
            return this;
        },

        /**
         * Удаляет класс из строки классов
         * @param {string} cls - Класс для удаления
         * @return {void}
         */
        removeClass(cls) {
            let classes = this.className.split(' ');
            let index = classes.indexOf(cls);
            if (index !== -1) {
                classes.splice(index, 1);
                this.className = classes.join(' ');
            }
        }
    };

    // Демонстрация работы с классами
    classObject.addClass('close');
    console.log("className после addClass('close'):", classObject.className);

    classObject.addClass('open');
    console.log("className после addClass('open'):", classObject.className);

    classObject.removeClass('menu');
    console.log("className после removeClass('menu'):", classObject.className);

    // Работа с JSON
    let jsonString = JSON.stringify(classObject, null, 2);
    console.log("JSON строка:", jsonString);

    let object2 = JSON.parse(jsonString);
    console.log('Сравнение объектов из JSON:', JSON.stringify(object2) === JSON.stringify(classObject));

    /**
     * Возвращает количество секунд с начала текущих суток
     * @return {number} Количество секунд с начала дня
     */
    function getSecondsToday() {
        let now = new Date();
        let start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Math.floor((now - start) / 1000); 
    }

    console.log("Секунд с начала дня: ", getSecondsToday());

    // Примеры работы с датами
    let date1 = new Date(2024, 0, 20); 
    let date2 = new Date(2000, 11, 1); 
    let date3 = new Date(1995, 9, 10); 

    console.log("Дата 1:", formatDateFixed(date1));
    console.log("Дата 2:", formatDateFixed(date2));
    console.log("Дата 3:", formatDateFixed(date3));
    
    console.log(`Время завершения: ${getFixedTime()}`);
} catch (error) {
    console.error("Произошла ошибка:", error.message);
}