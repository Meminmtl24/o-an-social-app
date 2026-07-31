export const CATEGORIES = [
  { id: 'all', label: 'Tüm Anılar', emoji: '✨', color: '#6366f1' },
  { id: 'absurd', label: 'Absürt', emoji: '🤯', color: '#a855f7' },
  { id: 'funny', label: 'Kahkaha (Komik)', emoji: '🤣', color: '#f59e0b' },
  { id: 'cringe', label: 'Utanç Verici (Rezillik)', emoji: '🤦‍♂️', color: '#ef4444' },
  { id: 'weird', label: 'Garip / Gizemli', emoji: '👽', color: '#10b981' },
  { id: 'work_school', label: 'İş & Okul', emoji: '🎒', color: '#3b82f6' },
  { id: 'transport', label: 'Toplu Taşıma', emoji: '🚌', color: '#ec4899' },
];

export const AVATARS = [
  { id: 'detective', emoji: '🕵️‍♂️', label: 'Dedektif' },
  { id: 'ninja', emoji: '🥷', label: 'Gizli Ninja' },
  { id: 'alien', emoji: '👽', label: 'Uzaylı' },
  { id: 'cat', emoji: '🐱', label: 'Maskeli Kedi' },
  { id: 'clown', emoji: '🤡', label: 'Komedyen' },
  { id: 'ghost', emoji: '👻', label: 'Hayalet' },
  { id: 'robot', emoji: '🤖', label: 'Robot' },
  { id: 'wizard', emoji: '🧙‍♂️', label: 'Büyücü' },
];

export const INITIAL_STORIES = [
  {
    id: 'story-1',
    title: 'Otobüste "İnecek Var" Yerine Yanlışlıkla Attığım Nida',
    content: 'Geçen hafta akşam iş çıkışı aşırı dolu bir metrobüsteyim. Durağa yaklaştık, kapıya uzağım. Şoföre "İnecek var!" diye seslenmek istedim ama kulaklığımda yüksek sesle müzik çalıyordu. Aklımdaki cümle ile müzik ritmi karıştı, tüm otobüsün ortasında "ARKADAŞLAR BEN GİDİYORUM HAKKINIZI HELAL EDİN!" diye bağırmışım. Şoför dikiz aynasından helallik istedi, teyzenin biri ayet okumaya başladı. Kapı açılınca utançtan ışık hızında kaçtım.',
    category: 'cringe',
    isAnonymous: true,
    authorName: 'Anonim Yolcu',
    authorAvatar: '🥷',
    createdAt: '2026-07-30T18:45:00.000Z',
    reactions: {
      laugh: 342,
      mindblown: 89,
      cringe: 512,
      heart: 120
    },
    comments: [
      {
        id: 'c-1',
        authorName: 'Metrobüs Mağduru',
        authorAvatar: '🚌',
        content: 'Teyzenin ayet okumasına koptum ahahahahah 😂',
        createdAt: '2026-07-30T19:10:00.000Z',
        isAnonymous: false
      },
      {
        id: 'c-2',
        authorName: 'Şoför Nebahat',
        authorAvatar: '🧢',
        content: 'Hakkımız helal olsun kardeşim sorun yok.',
        createdAt: '2026-07-30T20:00:00.000Z',
        isAnonymous: true
      }
    ],
    tags: ['#metrobüs', '#utanç', '#toplutaşıma']
  },
  {
    id: 'story-2',
    title: 'Online Toplantıda Kedi Yüzünden Kariyerimin Bitmesi',
    content: 'Şirketin en önemli CEO sunumundayım. Ekran paylaşıyorum, 80 kişi beni dinliyor. Tam en kritik ciro grafiğini anlatırken kedim arkadan klavyeme atladı. Önce ekran görüntüsü paylaşımına kedi resmi attı, ardından Zoom sohbet ekranına arkası arkasına "gggggggggghhhhhsssss" yazıp enterladı. Ben paniğe kapılıp düzeltmeye çalışırken "Miyav!" diye bağırıp kameraya kafa attı. CEO "Kedinizin stratejik vizyonunu çok beğendik" deyip toplantıyı bitirdi.',
    category: 'work_school',
    isAnonymous: false,
    authorName: 'Caner Bey',
    authorAvatar: '🐱',
    createdAt: '2026-07-29T14:20:00.000Z',
    reactions: {
      laugh: 890,
      mindblown: 230,
      cringe: 45,
      heart: 610
    },
    comments: [
      {
        id: 'c-3',
        authorName: 'PatiSever',
        authorAvatar: '🐾',
        content: 'Kediyi terfi ettirin derhal!',
        createdAt: '2026-07-29T15:00:00.000Z',
        isAnonymous: false
      }
    ],
    tags: ['#işhayatı', '#zoom', '#kedi', '#ceo']
  },
  {
    id: 'story-3',
    title: 'Gece 03:00\'te Evin İçinde Karşılaştığım Gizemli Şahıs',
    content: 'Üniversite yıllarında 3 arkadaş evde kalıyoruz. Gece yarısı susadım, mutfağa gittim. Karanlıkta buzdolabının kapağı açık, biri içeriden soğuk kıymalı pide yiyor. "Oğlum Mehmet sen misin?" dedim. Kıymalı pideyi yiyen adam yavaşça döndü, suratına buzdolabı ışığı vurdu. Adam Mehmet değildi. Hiç tanımadığım 40 yaşlarında bıyıklı bir amcaydı. Bana baktı, "Kapı açıktı, acıkmışım yeğenim kusura bakma" dedi. Pideden bir ısırık daha alıp sakince evden çıktı gitti. Hâlâ şoktayım.',
    category: 'absurd',
    isAnonymous: true,
    authorName: 'Pide Zede',
    authorAvatar: '🧙‍♂️',
    createdAt: '2026-07-28T03:15:00.000Z',
    reactions: {
      laugh: 1250,
      mindblown: 980,
      cringe: 110,
      heart: 430
    },
    comments: [
      {
        id: 'c-4',
        authorName: 'Pideci Rıza',
        authorAvatar: '🍕',
        content: 'Amca mekanı yanlış karıştırdı galiba',
        createdAt: '2026-07-28T04:00:00.000Z',
        isAnonymous: false
      },
      {
        id: 'c-5',
        authorName: 'Gece Kuşu',
        authorAvatar: '🦉',
        content: 'Absürtlüğün seviyesine bakar mısın filmlerde olmaz bu ahahaha',
        createdAt: '2026-07-28T09:30:00.000Z',
        isAnonymous: true
      }
    ],
    tags: ['#öğrencievi', '#gece', '#pide', '#absürt']
  },
  {
    id: 'story-4',
    title: 'Düğünde Gelinle Karıştırılan Teyzem',
    content: 'Kuzenimin düğününde teyzem o kadar kabarık ve bembeyaz bir abiye giymişti ki salona girerken damat yanlışlıkla teyzemin duvağımsı şalını açmaya çalıştı. Gerçek gelin arkada belirdi ve "Aşkım o benim teyzem!" diye çığlık attı. Bütün düğün boyunca garsonlar teyzeme "Gelin hanım içecek ne alırsınız?" diye servis yaptı.',
    category: 'funny',
    isAnonymous: false,
    authorName: 'Düğün Fotoğrafçısı',
    authorAvatar: '🤡',
    createdAt: '2026-07-27T21:00:00.000Z',
    reactions: {
      laugh: 730,
      mindblown: 140,
      cringe: 620,
      heart: 290
    },
    comments: [],
    tags: ['#düğün', '#teyze', '#gelinlik', '#komik']
  },
  {
    id: 'story-5',
    title: 'Sınavda Yanlışlıkla Gözetmenle Bakışarak Şarkı Söylemem',
    content: 'Üniversite final sınavında zor bir soruya takıldım. Kafamda istemsizce Sezen Aksu\'nun "Hadi Bakalım" şarkısı çalmaya başladı. Fısıltıyla "Rakkas geldi meydana..." derken gözlerimi tavana dikmişim. Meğerse gözetmen tam tepemde durmuş kağıdıma bakıyormuş. Şarkının en yüksek yerinde göz göze geldik. Adam tebessüm edip "Devam et sesin güzelmiş ama cevap B şıkkı değil" dedi.',
    category: 'weird',
    isAnonymous: true,
    authorName: 'Müzikal Öğrenci',
    authorAvatar: '👻',
    createdAt: '2026-07-26T11:10:00.000Z',
    reactions: {
      laugh: 640,
      mindblown: 190,
      cringe: 310,
      heart: 480
    },
    comments: [],
    tags: ['#sınav', '#üniversite', '#gözetmen', '#şarkı']
  }
];
