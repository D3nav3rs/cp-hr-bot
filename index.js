const TelegramBot = require ('node-telegram-bot-api')
const fs = require('fs')
const _ = require('lodash')
const TOKEN ='543800132:AAHJYD8aVz-l31pklWz5fTZ8Jk5LAUwfYss'
const bot =new TelegramBot(TOKEN, {polling:true})
const KB = {
    yes:'Да',
    no:'Уже нет :)',
    whatsnext: 'Что дальше?',
    noob_p1:'Шаг #1',
    noob_p1_yes:'Да, договорился',
    noob_p1_no:'Ещё нет',
    noob_p2: 'Шаг #2',
    noob_p3:'Шаг #3',
    noob_p4: 'Шаг #4',
    noob_p4_5: 'Шаг #5',
    noob_p5: 'Шаг #6',
    noob_p5_1:'Какие именно нужны документы?',
    sales_p1:'Шаг  #7',
    sales_p2: 'Шаг  #8',
    sales_p3:'Шаг  #9',
    sales_p4: 'Шаг  #10',
    sales_p5: 'Шаг  #11',
    sales_p1_yes: 'Есть',
    sales_p1_no: 'Нет',
    sales_p1_yes_yes: 'Установил',
    sales_p1_no_yes: 'Теперь у меня есть акканут в FaceBook',
    sales_p1_yes_no: 'Не хочу!',
    back: 'В начало',
    back2: 'Назад',
    sales_video: 'Видео-уроки',
    sales_p2_yes:'Да, у меня  есть Skype ID',
    sales_p2_no: 'Я не зарегистрирован в Skype',
    sales_p2_no_yes: 'Теперь у меня есть акканут в Skype'
}
const KB2 = {
    doc1: 'В отпуск',
    doc2: 'Отдохнуть "за свой счёт"',
    doc3: 'Я заболел  :(',
    doc4: 'Работать из дома',
    doc5: 'Узнать об  учете отсутствия на рабочем месте',
    doc6: 'Ой, Всё!',
    vacation: 'Оплачиваемый',
    dayoff: 'Административный'

}
const Photo = '/pictures/BackGround_FB2.jpg'

const PicScrs = {
    [KB.sales_p1_yes]: [
        'BackGround_FB.jpg',
        'BackGround_FB2.jpg'
    ],
    [KB.sales_p1_no]: [
        'BackGround_FB.jpg',
        'BackGround_FB2.jpg'
    ]
}
bot.onText(/\/start/, msg => {
    sendGreeting(msg)
})
bot.onText(/\/docs/, msg => {
    bot.sendMessage(msg.chat.id, 'Чего ты хочешь?', {
        reply_markup: {
            keyboard: [
                [KB2.doc1,KB2.doc2],
                [KB2.doc3,KB2.doc4],
                [KB2.doc5],
                [KB2.doc6],
                [KB.back]
            ]
        }
    })

})
bot.on('message', (msg) => {
    var  rviebash = "#рвиебаш"
    if (msg.text.toString().toLowerCase().includes(rviebash)) {
        sendToStepTwo(msg)}
    var  cp = "#cloudpayments"
    if (msg.text.toString().toLowerCase().includes(cp)) {
        bot.sendMessage(msg.chat.id, 'Вот тебе не заняться нечем, да?')}
    var  ck = "#cloudkassir"
    if (msg.text.toString().toLowerCase().includes(ck)) {
        bot.sendMessage(msg.chat.id, 'Заявязывай ты с этим. Я все влоги пишу, потом покажу начальству, чем ты занимаешься.')}
    var  bz = "#беризвони"
    if (msg.text.toString().toLowerCase().includes(bz)) {
        bot.sendMessage(msg.chat.id, 'Продам гараж ещё дороже!')}
    var  ir = "#беризвони"
    if (msg.text.toString().toLowerCase().includes(ir)) {
        bot.sendMessage(msg.chat.id, 'Да-да, иди работай.')}
/*    var a = ["болею", "забол", "темпер"];
    var index;
    for (index = 0; index < a.length; ++index) {
    if (msg.text.toString().toLowerCase().includes(a[index])) {
        bot.sendMessage(msg.chat.id, 'Иди на больничный')}
    }*/
});

//На больничный
bot.onText(/.*(болею|забол|темпер).*/i, (msg) => {
    bot.sendMessage(msg.chat.id, 'Раз такое дело, то:\n1.Позвони своему прямому руководителю, уведоми его; \n2.Обратись в мед.учереждение, получи больничный лист; \n3.Убедись, что все данные там корректны; \n4. Когда выйдешь на работу, отнеси его в HR отдел.\n *Выздоравливай!* ',{parse_mode:'Markdown'})
})
//В отпуск
bot.onText(/.*(отпуск).*/i, (msg) => {
    bot.sendMessage(msg.chat.id, 'В оплачиваемый  или администратиный?',{
        reply_markup: {
        keyboard: [
            [KB2.vacation,KB2.dayoff],
            [KB.back]
        ]
    }})

})
//в оплачиваемы
bot.onText(/.*(оплачиваемый).*/i, (msg) => {
    bot.sendMessage(msg.chat.id, '*Не менее, чем за 2 недели до планируемого отпуска:*\n1.Уточни в  HR отделе количество дней отпуска, которые ты можешь использовать;\n2.Напиши заявление на отпуск\n3.Получи автограф у своего непосредственного руководителя;\n4.Отнеси подписанное заявление в HR отдел;\nШаблон заявления сейчас подгружу :)',{parse_mode:'Markdown'})
    bot.sendDocument(msg.chat.id, 'Files/Vacation.docx')
})
//за свой счёт
bot.onText(/.*(отгул|свой счёт|свой счет|административный).*/i, (msg) => {
    bot.sendMessage(msg.chat.id, '*Не менее, чем за 2 дня до отпуска:*\n1.Напиши заявление на административный отпуск (сейчас подгружу ниже шаблон);\n2.Получи автограф у своего непосредственного руководителя;\n3.Отнеси подписанное заявление в HR отдел;',{parse_mode:'Markdown'})
    bot.sendDocument(msg.chat.id, 'Files/Day-off.docx')
})
bot.onText(/.*(из дома|по удаленке|удаленно|удалённо|по удалёнке|на дому).*/i, (msg) => {
    bot.sendMessage(msg.chat.id, 'Нужно поработать из дома? - не вопрос. Получи письменное разрешение от начальства и уведоми HR-отдел заранее.')
});
//ой всё
bot.onText(/.*(увольняюсь|уволит|заявление на увольнение|с меня хватит|не могу больше|ой, всё).*/i, (msg) => {
    bot.sendMessage(msg.chat.id, 'Глупое дело - не хитрое.\n *За две недели до предпологаемой даты увольнения:* \n1.Рисуй заявление(подгружу его ниже); \n2. Подпиши его у своего непосредственного руководителя; \n3.Отнеси заявление в HR отдел; \n *В день увольнения:*\n1.Заполни обходной лист (тоже подргужу ниже);\n2.Сдай  работодателю всё имущество, что тебе было выдано;\n3.В HR отделе подпиши все необходимые документы и не забудь трудовую книжку;\n4.Получи в бухгалтерии расчёт и  необходимые справки;\n Желаю тебе удачи! Держись там! :) ',{parse_mode:'Markdown'})
    bot.sendDocument(msg.chat.id, 'Files/Resignation.docx')
    bot.sendDocument(msg.chat.id, 'Files/Offboarding list.docx')
});
//приветы
bot.onText(/.*(привет|хай|hi|hello|здаров|шалом).*/i, (msg) => {
    bot.sendMessage(msg.chat.id, `Ну, привет-привет, ${msg.from.first_name}!`)
});
//гудбаи
bot.onText(/.*(пока|bye|покеда|прошай|до свидания|до завтра).*/i, (msg) => {
    bot.sendMessage(msg.chat.id, `Давай, до свидания!`)
});



bot.on('message',msg => {
    switch  (msg.text) {
        case KB.no:
            sendToHRForStepTwo(msg.chat.id)
            break
        case KB.yes:
            sendNoobOptions(msg.chat.id)
            break
        case KB.back:
            sendGreeting(msg, false)
            break
        case KB.noob_p1:
            bot.sendMessage(msg.chat.id, `Ты догворился о дате выхода на работу?`,{
            reply_markup: {
                keyboard: [
                    [KB.noob_p1_yes,KB.noob_p1_no],
                    [KB.back]
                ]
            }})
            break
        case KB.noob_p1_yes:
            bot.sendMessage(msg.chat.id, `Молодец! Тогда идём дальше!`,{
                reply_markup: {
                    keyboard: [
                        [KB.noob_p2],
                        [KB.back]
                    ]
                }})
            break
        case KB.noob_p1_no:
            bot.sendMessage(msg.chat.id, `Позвони *HR Менеджеру Юлии +7(916) 817-41-74*, договорись. `,{parse_mode:'Markdown'},{
                reply_markup: {
                    keyboard: [
                        [KB.noob_p2],
                        [KB.back]
                    ]
                }})
            break
        case KB.noob_p2:

                bot.sendLocation(msg.chat.id,55.7168765, 37.6131104)
            bot.sendMessage(msg.chat.id, 'Выходи на работу в день, на который вы договрились.\nЖдем тебя *в 9:50 по адресу ул. Шухова, 14.*\nПропуск  в БЦ будет заказан - не забудь свой паспорт!',{
                parse_mode:'Markdown',
                reply_markup: {
                    keyboard: [
                        [KB.noob_p3],
                        [KB.back]
                    ]
                }})
            break
        case KB.noob_p3:
            bot.sendMessage(msg.chat.id, `Приходи в *205й кабинет* на втором этаже и  заходи в первую дверь слева. HR Менеджер Юлия тебя встретит и проводит на твоё рабочее место.`,{
                parse_mode:'Markdown',
                reply_markup: {
                    keyboard: [
                        [KB.noob_p4],
                        [KB.back]
                    ]
                }})
            break
        case KB.noob_p4:
            bot.sendMessage(msg.chat.id, `Проверь свою личную почту. Там ты найдешь  учетные данные от рабочего ящика. Мы используем корпоративное почтовое решение на gmail.com. Используй эти учетные данные для входа и ознакомься с приветственным письмом.`,{
                reply_markup: {
                    keyboard: [
                        [KB.noob_p4_5],
                        [KB.back]
                    ]
                }})
            break
        case KB.noob_p4_5:
            bot.sendMessage(msg.chat.id, `В 12-00 в переговорной менеджер по персоналу проведет персональный тренинг и экскурсию по офису, познакомит тебя с твоими коллегами. Будь готов рассказать несколько слов о себе. *Подготовься заранее!!*`,{
                parse_mode:'Markdown',
                reply_markup: {
                    keyboard: [
                        [KB.noob_p5],
                        [KB.back]
                    ]
                }})
            break
        case KB.noob_p5:
            sendNoobOptions_noob_p5(msg.chat.id)
            break
        case KB.noob_p5_1:
            bot.sendMessage(msg.chat.id, `*Вот эти:*\n1. Паспорт или иной документ, удостоверяющий личность;\n2. Трудовую книжку, за исключением случаем, когда трудовой договор для тебя заключается впервые или ты поступаешь на работу на условиях совместительства;\n3. Страховое свидетельство государственного пенсионного страхования (СНИЛС;\n4. Документы воинского учета -  если ты военнообязанное лицо, либо подлежишь призыву на военную службу;\n5. Документ об образовании, о квалификации или наличии специальных знаний;\n6. ИНН (по желанию);\n7. Справки о доходах с предыдущего места работы (по желанию);` ,{
                parse_mode:'Markdown',
                reply_markup: {
                    keyboard: [

                        [KB.back]
                    ]
                }})
            break
        case KB.sales_p1:
            askForFBAccount(msg.chat.id)
            break
        case KB.sales_p1_yes:
            sendPicture(msg.chat.id, msg.text)
            break
        case KB.sales_p1_yes_yes:
            bot.sendMessage(msg.chat.id, `Отлично! Теперь присоединись к группе https://www.facebook.com/cloudpayments/`,{
                reply_markup: {
                    keyboard: [
                        [KB.sales_p2],
                        [KB.back2]
                    ]
                }})
            break
        case KB.sales_p1_no:
            bot.sendMessage(msg.chat.id, `Зарегистрируйся https://www.facebook.com/reg/ 
            Теперь у тебя есть аккаунт в FaceBook?`,{
                reply_markup: {
                    keyboard: [
                        [KB.sales_p1_yes],
                        [KB.back2]
                    ]
                }})
            break
        case KB.sales_p1_no_yes:

            bot.sendMessage(msg.chat.id, `Очень шустро! Молодец!`,{
                reply_markup: {
                    keyboard: [
                        [KB.sales_p1_yes],
                        [KB.back2]
                    ]
                }})

            break
        case KB.sales_p2:
            askForSkypeAccount(msg.chat.id)
            break
        case KB.sales_video:
            break
        case KB.sales_p2_yes:
            bot.sendMessage(msg.chat.id, `Добавь в контакты *tatyana_afonina1*. Попроси Татьяну добавить тебя в корпоративные чаты. `,{
                parse_mode:'Markdown',
                reply_markup: {
                    keyboard: [
                        [KB.whatsnext],
                    [KB.back2]
                    ]
                }})
            break
        case KB.sales_p2_no:
            bot.sendMessage(msg.chat.id, `Зарегистрируйся https://support.skype.com/ru/faq/FA12331/kak-zaregistrirovat-sya-v-skype`,{
                reply_markup: {
                    keyboard: [
                        [KB.sales_p2_no_yes],
                        [KB.back2]
                    ]
                }})
            break
        case KB.sales_p2_no_yes:
            bot.sendMessage(msg.chat.id, `Добавь в контакты tatyana_afonina1. Попроси Татьяну добавить тебя в корпоративные чаты.`,{
                reply_markup: {
                    keyboard: [
                        [KB.whatsnext],
                        [KB.back2]
                    ]
                }})
            break
        case KB.whatsnext:
            bot.sendMessage(msg.chat.id, `Иди в HR,скажи, что достиг просветления. Тебе дадут ещё одно кодовое слово =)`,{
                reply_markup: {
                    keyboard: [
                                              [KB.back]
                    ]
                }})
            break
        case KB.back2:
            bot.sendMessage(msg.chat.id, ` ок`,{
            reply_markup: {
                keyboard: [
                    [KB.sales_p1,KB.sales_p2],
                    [KB.back]
                ]
            }})
            break
        case KB2.doc5:
            bot.sendMessage(msg.chat.id, `Твое начальсвто следит за тобой. Отсутствие на рабочем месте без письменного разрешения не считается рабочим днём. Помимо разрешения необходимо заранее информировать HR отдел об этом.`)
            break

    }
})
function sendNoobOptions(chatId) {
    bot.sendMessage(chatId, 'Соверши следущие действия: ', {
        reply_markup: {
            keyboard: [
                [KB.noob_p1,KB.noob_p2],
                [KB.noob_p3,KB.noob_p4],
                [KB.noob_p4_5,KB.noob_p5],
                [KB.back]
            ]
        }
    })
}
function sendNoobOptions_noob_p5(chatId){
    bot.sendMessage(chatId, `Передай  Юлии все документы, которые необходимы для оформления, подписанный оффер в бумажном виде, и подписанный план работы на испытательный срок!`, {
        reply_markup: {
            keyboard: [
                [KB.noob_p5_1],
                [KB.back]
            ]
        }
    })
}
function sendToHRForStepTwo(chatId) {
    bot.sendMessage(chatId, 'Сходи к Татьяне Афониной и получи кодовое слово. ' +
        'Скажи мне его и узнаешь, что  делать дальше!', {
        reply_markup: {
            keyboard:[
                [KB.back]
            ]
        }
    })
}
function sendToStepTwo(msg) {
    bot.sendMessage(msg.chat.id, 'Поздравляю! Теперь выполни следущее:', {
        reply_markup: {
            keyboard:[
                [KB.sales_p1,KB.sales_p2],
                [KB.back]

            ]
        }
    })
}
function askForFBAccount(chatId) {
    bot.sendMessage(chatId, 'У тебя  есть аккаунт в Facebook?', {
        reply_markup: {
            keyboard:[
                [KB.sales_p1_yes,KB.sales_p1_no],
                [KB.back2]

            ]
        }
    })
}
function askForSkypeAccount(chatId) {
    bot.sendMessage(chatId, 'у тебя  есть аккаунт в Skype?', {
        reply_markup: {
            keyboard:[
                [KB.sales_p2_yes,KB.sales_p2_no],
                [KB.back2]

            ]
        }
    })
}
function sendPicture(chatId, picName) {
    const srcs = PicScrs[picName]
    const src = srcs[_.random(0, srcs.length - 1)]
    bot.sendMessage(chatId, `Подргужаю...`)
    fs.readFile(`${__dirname}/pictures/${src}`, (error, picture) => {
        if (error) throw new Error(error)
        bot.sendPhoto(chatId, picture).then(() =>{
            bot.sendMessage(chatId, `Сохрани эту картинку. Установи её в качестве обложки твоего профиля в FaceBook.
            
            Установил?`,{reply_markup: {
                keyboard: [
                    [KB.sales_p1_yes_yes],
                    [KB.back2]

                ]
            }})
        })

})
}
function sendGreeting(msg, sayHello=true) {
    const text = sayHello
        ?`Привет, ${msg.from.first_name}!\n Ты новичок в CloudPayments?`
        : `Ты все ещё новичок?`
    bot.sendMessage(msg.chat.id, text, {
        reply_markup: {
            keyboard: [
                [KB.yes,KB.no]
            ]
        }
    })
}
