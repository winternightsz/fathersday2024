document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const keyboard = document.getElementById('keyboard');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificacao = document.getElementById('notificacao');
    const notificationMessagens = document.getElementById('notification-messagens');
    const closeNotificationBtn = document.getElementById('close-notification');
    const notificationGif = document.getElementById('notification-gif');


    let currentRow = 0;
    let currentCol = 0;
    const maxAttempts = 6;
    let secretWord = '';
    let gameEnded = false;

    const wordsList = [
        "abada", "abade", "abafa", "abala", "abano", "abata", "abate", "abeto", "abono", "abrir", 
        "abuso", "acaba", "acaso", "acata", "acejo", "acena", "aceso", "achar", "acode", "acuda", 
        "acude", "adaga", "adega", "adere", "adobe", "adoca", "adoce", "adora", "aduba", "adubo", 
        "aereo", "afaga", "afago", "afana", "afeto", "afiar", "afixo", "afora", "afrou", "agape", 
        "agito", "agora", "aguar", "aguia", "agudo", "ajuda", "ajude", "alado", "alaga", "alaga", 
        "alamo", "alava", "alçar", "alçar", "aldea", "alegr", "algas", "algaz", "algor", "algum", 
        "aliar", "alisa", "alisar", "alise", "almas", "aloca", "aloja", "aloje", "alojo", "alpes", 
        "altar", "aluda", "alude", "aluno", "aluir", "alvor", "amado", "amago", "amada", "amaro", 
        "ambar", "ambos", "amear", "ameba", "amido", "amiga", "amigo", "amola", "amplo", "ancia", 
        "andar", "andes", "anela", "anexa", "anexo", "angor", "animo", "anita", "anoes", "ansar", 
        "antes", "antro", "anual", "anula", "anule", "anulo", "aonde", "aorta", "apaga", "apego", 
        "apita", "apito", "apoia", "apoie", "apoio", "apuro", "aquem", "arado", "arana", "arara", 
        "arcar", "ardar", "arear", "areia", "areja", "arejo", "arfao", "arfar", "argua", "argue", 
        "arguo", "arias", "armar", "aroma", "arpao", "arroz", "arrua", "arruo", "artes", "aspas", 
        "assar", "assaz", "asses", "assim", "astro", "atado", "atamo", "atava", "atear", "ateia", 
        "ateie", "atela", "atemo", "ateou", "ativa", "ative", "ativo", "atola", "atole", "atolo", 
        "atomo", "atona", "atono", "atriz", "atuar", "atura", "ature", "atuou", "audio", "audar", 
        "aulas", "auras", "autor", "autos", "avara", "avaro", "avela", "avelo", "aviar", "avido", 
        "avisa", "avise", "aviso", "azara", "azedo", "azima", "azimo", "azote", "babar", "bacia", 
        "bacon", "badal", "bafio", "bagas", "bagre", "baila", "baixo", "balao", 
        "balas", "balda", "balde", "baldo", "balir", "bamba", "bambo", "banal", "banha", "banho", 
        "banco", "banda", "bando", "banir", "barba", "barco", "barda", "bardo", "bares", "barro", 
        "basal", "basar", "baseo", "basis", "basso", "basta", "baste", "basto", "batel", "bater", 
        "batia", "batom", "bauru", "bayes", "beata", "beato", "bebes", "bebeu", "becos", "bedel", 
        "beija", "beijo", "beira", "beiro", "belas", "belos", "benfe", "benga", "benza", "berro", 
        "berma", "berna", "berta", "berro", "bespa", "besta", "betar", "betas", "betum", "bicho", 
        "bidas", "bidet", "biela", "bigas", "bijus", "bilis", "bilro", "binar", "bingo", "bique", 
        "birra", "bisar", "bisao", "bisca", "bispo", "blase", "blefe", "bloco", "blusa", "boate", 
        "bocal", "bocha", "boche", "bodas", "boiar", "boias", "boina", "boiar", "boiar", "boina", 
        "bolao", "bolas", "bolbo", "bolca", "bolha", "bolor", "bolos", "bolsa", "bomba", "bombo", 
        "bonde", "bonzo", "borda", "bordo", "borla", "borne", "borra", "bosco", "botao", "botas", 
        "botim", "botao", "botar", "botas", "bozos", "braba", "brabo", "braco", "brado", "brasa", 
        "brava", "bravo", "break", "breia", "brejo", "breve", "brida", "briga", "brigo", "broca", 
        "broco", "broxa", "broxe", "broxa", "broxe", "bruma", "bruta", "bruto", "bueno", "bufao", 
        "bufar", "bufoa", "bujao", "bulbo", "bulas", "bunda", "burgo", "burla", "burra", "burro", 
        "busao", "busto", "butao", "buzar", "cabal", "cabaz", "caber", "cabia", "cabos", "cabre", 
        "cagar", "caiar", "caiba", "caibo", "caido", "cairo", "caixa", "caixe", "cajar", "cajus",
        "calar", "calca", "calco", "calda", "caldo", "calei", "calha", "calmo", "calor", "calva",
        "calvo", "camas", "campa", "campo", "canal", "canas", "canja", "canoa", "canse", "canta",
        "cante", "canto", "capar", "capaz", "capim", "capuz", "caras", "carda", "carei", "carga",
        "cargo", "caria", "carne", "carpa", "carpo", "carro", "carta", "casal", "casar", "casas",
        "casco", "casei", "casos", "cassa", "casta", "caste", "casto", "catar", "catou", "catre",
        "cauda", "caule", "causa", "cause", "cauto", "cavar", "ceder", "cedeu", "cegas", "cegos",
        "ceifa", "ceifa", "ceifo", "ceira", "celas", "celta", "cenho", "censo", "cento", "cerco",
        "cerda", "cerca", "cerne", "cerni", "cerro", "certa", "certo", "cervo", "cesta", "cesto",
        "cetim", "cetra", "chaco", "chaga", "chale", "chama", "chame", "chamo", "chapa", "chata",
        "chato", "checa", "chefe", "chega", "cheia", "cheio", "chiar", "china", "choca", "choco",
        "chora", "chore", "choro", "chove", "chupa", "chupo", "chuto", "chuva", "ciado", "cicla",
        "ciclo", "cidra", "cifra", "cifre", "cifro", "cimas", "cinto", "cinza", "circo", "cisco",
        "cisma", "cisma", "cisne", "citai", "citar", "citia", "civel", "clama", "clame", "clamo",
        "clara", "claro", "clava", "clave", "clero", "clima", "clipe", "clone", "cobra", "cobre",
        "cobro", "cocar", "cocei", "cocos", "cocar", "coche", "cocho", "codas", "coesa", "coeso",
        "cofre", "coice", "coifa", "coito", "colar", "colhe", "colhi", "colos", "combo", "comes",
        "comeu", "comia", "como", "conhe", "copas", "copos", "coral", "corar", "corca", "corco",
        "corda", "cores", "corja", "corno", "corpo", "corra", "corre", "corri", "corro", "corta",
        "corte", "corvo", "coser", "cosme", "cosmo", "cospe", "costa", "cotas", "couro", "couva",
        "couve", "covas", "covil", "coxas", "cozer", "craca", "crase", "crede", "credo", "creia",
        "creme", "crepe", "criar", "crime", "crina", "crino", "crise", "criva", "crive", "crivo",
        "croio", "cruel", "cruze", "cubas", "cubos", "cuida", "cuide", "culpa", "culpo", "cumes",
        "cunha", "cunto", "cupom", "curar", "curdo", "curie", "curra", "curra", "curso", "curta",
        "curte", "curto", "custa", "custe", "custo", "cutis", "cutra", "cacau", "cacho", "cacos", 
        "cafes", "dacio", "dados", "dador", "daime", "damas", "danar", "danca", "dando", "dante", 
        "dardo", "darei", "daria", "darma", "dados", "datar", "daudo", "davos", "dedal", "dedao",
        "dedar", "dedeu", "dedos", "densa", "dense", "denso", "dente", "dessa", "desse", "deste",
        "deter", "deusa", "dever", "deves", "deveu", "devia", "diaba", "diabo", "diana", "dicas",
        "dinda", "dique", "disca", "disco", "dispo", "disse", "dista", "disto", "ditar", "dizia",
        "doada", "doado", "doais", "doara", "dobra", "dobre", "dobro", "docas", "doces", "doida",
        "doido", "dogma", "doiam", "dolar", "donde", "dores", "dorme", "dormi", "dorna", "dosar",
        "dotes", "dotou", "douta", "douto", "draga", "drama", "dreno", "dripe", "droga", "drogo",
        "drupa", "dublar", "dubla", "dublo", "ducha", "duela", "duelo", "dueto", "dular", "dulas",
        "dumas", "dumbo", "dunar", "dunas", "dunga", "dupla", "duplo", "duram", "durar", "duras",
        "duros", "durou", "dutos", "daqui", "ecoar", "ecoou", "edema", "edita", "edite", "edito", 
        "egeus", "eidos", "eiras", "eixos", "elado", "elava", "elche", "eldor", "eleja", "elejo", 
        "elemi", "elena", "eleva", "eleve", "elevo", "elias", "elite", "elixo", "elmos", "emana", 
        "emano", "embas", "embia", "emita", "emite", "emito", "emoco", "encho", "encol", "enda", 
        "enfia", "enfim", "engua", "enodo", "enola", "enove", "enred", "enros", "entra", "entre", 
        "entro", "envia", "envie", "envio", "enzas", "epica", "epico", "epura", "epuro", "equas", 
        "eques", "erado", "erama", "erato", "ereis", "ergia", "ergue", "erica", "erige", "erija", 
        "erijo", "ermas", "eroca", "erode", "errei", "errar", "erras", "erros", "eruca", "erudi", 
        "ervar", "ervas", "escoa", "escol", "escre", "escro", "escua", "escus", "esfar", "esgar", 
        "esgui", "esmo", "espia", "espie", "espio", "espoa", "espor", "espos", "espra", "espre", 
        "esque", "estai", "estar", "estas", "estia", "estio", "estol", "estor", "estro", "esvao", 
        "etano", "etapa", "etena", "etene", "eteno", "etica", "etico", "etila", "etilo", "etima", 
        "etino", "etipe", "etome", "etuda", "etude", "etudo", "etusa", "eubea", "eubeu", "eulas", 
        "evada", "evade", "evadi", "evase", "evita", "evite", "evito", "evoca", "evoco", "evola", 
        "evora", "exata", "exato", "exibe", "exibi", "exido", "exige", "exijo", "exila", "exile", 
        "exilo", "expia", "expie", "expio", "expus", "expor", "extra", "educa", "edule", "efusa", 
        "efuso", "fabas", "facao", "facas", "faces", "facho", "facil", "fadoa", "fados", "faena", 
        "fages", "fagos", "faial", "faias", "falar", "falas", "falca", "falda", "falei", "falha",
        "falhe", "falho", "falir", "falsa", "falso", "falta", "falte", "falto", "fanar", "fanfa",
        "fanho", "faqui", "farad", "faras", "farda", "fardo", "farei", "farol", "faros", "farra",
        "farsa", "farta", "farto", "farum", "fasca", "fases", "fassa", "faste", "fatal", "fator",
        "fatos", "fatia", "fatie", "fatio", "fator", "fator", "fauna", "favas", "favor", "favos",
        "feche", "fecho", "feder", "fedor", "feias", "feila", "feios", "feira", "feire", "feito",
        "feliz", "felos", "felpo", "femur", "fenda", "fende", "fendi", "feral", "feras", "feraz",
        "ferem", "feres", "feria", "ferir", "feris", "feriu", "feroz", "ferra", "ferro", "ferva",
        "ferve", "fervo", "festa", "fetal", "fetar", "fetim", "fetos", "feudo", "fezes", "fiada",
        "fiado", "fiais", "fiamo", "fiara", "fiava", "fibra", "ficai", "ficam", "ficar", "ficas",
        "ficou", "fieis", "fifar", "fifas", "filai", "filam", "filar", "filas", "filem", "files",
        "filha", "filho", "filia", "filie", "filio", "filma", "filme", "filmo", "final", "finar",
        "finca", "finca", "finda", "finde", "findo", "finir", "finis", "finja", "finjo", "finta",
        "finte", "finto", "firma", "firme", "firmo", "fisco", "fisga", "fisgo", "fisio", "fitai",
        "fitam", "fitar", "fitas", "fitei", "fitem", "fites", "fitou", "fixai", "fixam", "fixar",
        "fixas", "fixei", "fixem", "fixes", "fixos", "fixou", "fizer", "flama", "flash", "flava",
        "flavo", "flema", "fleme", "flora", "flore", "flori", "fluir", "fluor", "fluxo", "focal",
        "focar", "focas", "focei", "focos", "foeta", "fofos", "fogal", "fogem", "foges", "foice",
        "foide", "folar", "foles", "folga", "folgo", "folha", "folia", "follo", "fomes", "fomos",
        "fonde", "foral", "foram", "forao", "forca", "forco", "forja", "forje", "forjo", "forma",
        "forme", "formo", "forno", "foros", "forra", "forro", "forte", "forum", "fosca", "fosco",
        "fossa", "fosse", "foste", "fotos", "fraca", "fraco", "frade", "fraga", "frase", "frear",
        "freio", "frema", "freme", "freou", "fresa", "frese", "freso", "frete", "frial", "frisa",
        "frise", "friso", "frita", "frite", "frito", "frota", "fruir", "fruis", "fruta", "fruto",
        "fugaz", "fugir", "fugiu", "fulvo", "fumai", "fumam", "fumar", "fumas", "fumei", "fumem",
        "fumes", "fumos", "fumou", "funco", "fungo", "funil", "furai", "furam", "furar", "furas",
        "furei", "furem", "fures", "furia", "furor", "furou", "fusa", "fusao", "fusco", "fusor",
        "futil", "fagar", "gabai", "gabar", "gabas", "gabei", "gabem", "gabes", "gabou", "gacha", 
        "gadoa", "gados", "gafar", "gagas", "gagos", "gague", "gaial", "gaias", "gaita", "gajao",
        "galas", "galar", "galas", "galdo", "galha", "galho", "galos", "gamar", "gamba", "gambo",
        "gamos", "ganem", "ganes", "ganha", "ganhe", "ganho", "gania", "ganir", "ganis", "ganja",
        "ganso", "garbo", "garfo", "garoa", "garra", "garro", "garua", "garue", "garuo", "gaspa",
        "gaste", "gasto", "gatas", "gatos", "gauda", "gaudo", "gaulo", "gaura", "gavio", "gazua",
        "geada", "geado", "geais", "geamo", "geara", "geava", "gelai", "gelam", "gelar", "gelas",
        "gelei", "gelem", "geles", "gelha", "gelho", "gelos", "gelou", "gemam", "gemas", "gemei",
        "gemem", "gemer", "gemes", "gemeu", "gemia", "genio", "genro", "gente", "gerai", "geral",
        "geram", "gerar", "geras", "gerei", "gerem", "geres", "geria", "gerir", "geris", "germe",
        "gerou", "gesso", "gesta", "geste", "gesto", "getas", "gibas", "gibao", "giber", "gigas",
        "gimos", "ginja", "giras", "girau", "girei", "girem", "gires", "girou", "giros", "gizar",
        "gizei", "gizem", "gizes", "gizos", "gizou", "glaca", "glace", "gleba", "glena", "glete",
        "glial", "glide", "glifo", "globe", "globo", "glosa", "glose", "gloso", "glote", "gnoma",
        "gnomo", "goela", "goiai", "goiam", "goiar", "goias", "goiei", "goiem", "goies", "goios",
        "goiou", "goite", "goiva", "golas", "golei", "golem", "goles", "golfa", "golfe", "golfo",
        "golpe", "gomos", "gonzo", "gorai", "goral", "goram", "gorar", "goras", "gorda", "gorde",
        "gordo", "gorei", "gorem", "gores", "gorou", "gosma", "gosmo", "gosta", "goste", "gosto",
        "gotas", "gotei", "gotem", "gotes", "gotou", "gouda", "gozam", "gozar", "gozas", "gozei",
        "gozem", "gozes", "gozos", "gozou", "graal", "graca", "grade", "grado", "grafa", "grafe",
        "grafo", "grama", "grame", "gramo", "grana", "grane", "grani", "grano", "graos", "grata",
        "grato", "grave", "graxa", "graxo", "green", "grege", "grela", "grele", "grelo", "greta",
        "greve", "grifa", "grife", "grifo", "grila", "grile", "grilo", "grima", "gripa", "gripe",
        "gripo", "grita", "grite", "grito", "grode", "groir", "grolo", "grota", "gruda", "grude",
        "grudo", "gruia", "gruim", "gruir", "gruis", "gruja", "gruje", "grujo", "gruma", "grumo",
        "gruta", "guaco", "guais", "guapo", "guara", "guaxe", "guebo", "gueis", "gueto", "guiai",
        "guiam", "guiar", "guias", "guiei", "guiem", "guies", "guiou", "guizo", "gulag", "gular",
        "gulas", "gumes", "gunas", "gunga", "gurar", "guris", "gurus", "gusla", "gusle", "guslo",
        "gusta", "guste", "gusto", "gacho", "gadan", "habes", "habit", "hajam", "hajas", "halos", 
        "haver", "havia", "heavy", "hemos", "heras", "herda", "herde", "herdo", "herem", "heres",
        "herma", "heroi", "hertz", "hiato", "hiena", "higgs", "hindu", "hiper", "hipos", "hirta",
        "hirto", "hobby", "homer", "honor", "honra", "honre", "honro", "horas", "horaz", "horda",
        "horiz", "hoste", "hotel", "houve", "hulha", "humor", "humus", "haras", "harpa", "harpe",
        "harpo", "haste", "ibero", "icara", "iceis", "icone", "ictus", "ideal", "idear", "ideia", 
        "igapo", "igual", "ilesa", "ileso", "ilhai", "ilham", "ilhar", "ilhas", "ilhei", "ilhem",
        "ilhes", "ilhoa", "ilhou", "ilude", "iludi", "imita", "imite", "imito", "imola", "imole",
        "imolo", "impar", "impla", "implo", "impus", "imune", "inata", "inato", "index", "india",
        "indio", "induz", "infla", "infle", "inflo", "infra", "iniba", "inibe", "inibi", "inibo",
        "inova", "inove", "inovo", "insta", "inter", "intra", "intua", "intui", "intuo", "invio",
        "iodar", "iogue", "irada", "irado", "iriam", "irias", "irite", "irmas", "irmos", "iscas",
        "isola", "isole", "isolo", "itero", "itiva", "itivo", "ixode", "idosa", "idoso", "jabre", 
        "jacas", "jacta", "jacto", "jagas", "jagra", "janta", "japao", "japim", "jarda", "jarra", 
        "jatos", "jaula", "jegue", "jeira", "jeito", "jejas", "jejum", "jijus", "jaspe", "justo",
        "jinga", "jogai", "jogam", "jogar", "jogas", "jogue", "jogou", "jorge", "jorra", "jorre",
        "jorro", "jotas", "joule", "jovem", "jubas", "judas", "judeu", "julia", "julio", "julho",
        "junco", "junta", "junte", "junto", "jurai", "juram", "jurar", "juras", "jurei", "jurem",
        "jures", "jurou", "justa", "kanal", "karma", "kebab", "kendo", "khmer", "kioto", "klein", 
        "kurdo", "kuros", "kyrie", "koala", "krill", "kungo", "labia", "labor", "lacar", "laces", 
        "lagar", "lagoa", "lajos", "laico", "laitu", "lajea", "lamas", "lamba", "lambe", "lambo",
        "lames", "lamia", "lampa", "lanar", "lança", "lança", "lando", "lapar", "lapas", "lapso",
        "laque", "larga", "largo", "latas", "latex", "latia", "latir", "latis", "latou", "lauda",
        "laude", "laudo", "laura", "lavar", "lavas", "lavor", "lavou", "laxar", "leais", "lebre",
        "lebus", "legal", "legar", "legou", "leiam", "leias", "leigo", "leite", "leito", "lemos",
        "lenda", "lendo", "lenha", "lenho", "lento", "lepra", "leram", "leras", "lerdo", "lerei",
        "leria", "lesai", "lesam", "lesao", "lesar", "lesas", "lesei", "lesem", "leses", "lesma",
        "lesou", "letal", "letao", "letra", "leuco", "levai", "levam", "levar", "levas", "levei",
        "levem", "leves", "levou", "lhama", "lhano", "liame", "libra", "liceu", "licor", "lidai",
        "lidam", "lidar", "lidas", "lidei", "lidem", "lides", "lidou", "ligai", "ligam", "ligar",
        "ligas", "ligou", "lilas", "limai", "limam", "limar", "limas", "limei", "limem", "limes",
        "limou", "lindo", "linha", "linho", "lirai", "liram", "liras", "liria", "liros", "lisar",
        "lisca", "lisco", "lisos", "litar", "litio", "litre", "livra", "livre", "livro", "lixos",
        "lobas", "lobos", "locai", "local", "locam", "locar", "locas", "locou", "lodos", "logar",
        "logia", "logos", "loira", "loiro", "lojas", "longa", "longo", "lonja", "loque", "lorca",
        "lorca", "lorde", "lotai", "lotam", "lotar", "lotas", "lotei", "lotem", "lotes", "lotou",
        "louca", "louco", "loura", "louro", "lousa", "luada", "luado", "luais", "luana", "lucas",
        "lucra", "lucre", "lucro", "lugar", "luges", "luias", "luigi", "lulas", "lumen", "lunar",
        "lupas", "lupus", "lurar", "lusas", "lusos", "lutai", "lutam", "lutar", "lutas", "lutei",
        "lutem", "lutes", "lutou", "luxai", "luxam", "luxar", "luxas", "luxei", "luxem", "luxes",
        "luxou", "luzam", "luzas", "luzes", "luzir", "luzis", "lacha", "lacre", "lados", "ladra", 
        "ladre", "ladro", "macau", "macio", "macis", "macro", "madre", "mafia", "magia", "magna", 
        "magro", "maias", "maior", "major", "malas", "malta", "malva", "mamae", "mamas", "mamou",
        "manas", "manca", "manco", "manda", "mande", "mando", "manga", "mango", "manja", "manje",
        "manjo", "manso", "manta", "manto", "maori", "mapas", "mares", "marte", "massa", "masto",
        "matai", "matam", "matar", "matas", "matei", "matem", "mates", "matiz", "matos", "matou",
        "maues", "mauis", "meada", "meado", "mecha", "medem", "medes", "media", "medir", "medis",
        "mediu", "meias", "meiga", "meigo", "meios", "melar", "melas", "melga", "melou", "membro",
        "menor", "menos", "menta", "mente", "menti", "merda", "mesas", "meses", "metal", "meter",
        "meteu", "metia", "metro", "miado", "miara", "miava", "micas", "micra", "micro", "midia",
        "mielo", "migar", "migre", "migro", "milha", "milho", "mimos", "minar", "minas", "minha",
        "minis", "minor", "minta", "minto", "miolo", "mirai", "miram", "mirar", "miras", "mirei",
        "mirem", "mires", "mirou", "mirra", "missa", "mista", "misto", "mitos", "mitra", "mixar",
        "moais", "moamo", "mobia", "moeda", "moeis", "moela", "moera", "mofar", "mofei", "mofem",
        "mofes", "mofou", "moiam", "moias", "moida", "moido", "moira", "moita", "moito", "molas",
        "molda", "moldo", "moles", "molha", "molhe", "molho", "monge", "monja", "monta", "monte",
        "monto", "moral", "morar", "moras", "morbo", "morda", "morde", "mordi", "mordo", "morna",
        "morno", "morte", "mosca", "mosco", "motel", "motor", "motos", "moura", "mouro", "mover",
        "moves", "moveu", "movia", "moxar", "moxei", "moxem", "moxes", "moxou", "mozar", "muara",
        "mucro", "mudar", "mudas", "mudei", "mudem", "mudes", "mudos", "mudou", "muita", "muito",
        "mujam", "mujas", "mulas", "multa", "multe", "multo", "mundo", "munes", "mungo", "munir",
        "munis", "muniu", "mural", "murar", "muras", "murou", "museu", "musgo", "musas", "musos",
        "mutar", "mutua", "mutuo", "muito", "muque", "magno", "magra", "nabos", "nacar", "naifa", 
        "nariz", "narra", "nasal", "nasce", "natal", "natas", "naves", "navio", "nazar", "nebel",
        "necas", "necra", "nedar", "negar", "negas", "negra", "negro", "negue", "negus", "nelas",
        "neles", "nenem", "nente", "nepos", "neque", "nesga", "nessa", "nesse", "nesta", "neste",
        "neura", "neuro", "nevar", "neves", "nevoa", "nevou", "nexos", "nhaca", "nhara", "nhata",
        "nicto", "ninar", "ninas", "ninho", "ninos", "nisso", "nisto", "nival", "nivel", "nocar",
        "nocha", "nodar", "nodar", "nodas", "noemi", "noira", "noite", "noiva", "noive", "noivo",
        "nomes", "noras", "norar", "norso", "notar", "notas", "notou", "noval", "novar", "novas",
        "novos", "noxio", "nuais", "nublar", "nudar", "nudes", "nulas", "nulos", "numas", "nunca",
        "nunes", "nuvem", "nuvio", "nylon", "naipe", "naira", "nanar", "nanar", "nanas", "nanca", 
        "nardo", "obeso", "obrar", "obras", "obrou", "obsta", "obste", "obsto", "ocaso", "ocupa", 
        "ocupo", "odeio", "odiar", "odias", "odiei", "odila", "odora", "odoso", "ofega", "ofego", 
        "ofuro", "ogiva", "olear", "olega", "olhai", "olham", "olhar", "olhas", "olhei", "olhem", 
        "olhes", "olhos", "olhou", "oliva", "omita", "omite", "omiti", "omito", "ondar", "ondas", 
        "ondea", "oneca", "opaca", "opaco", "opera", "opere", "opero", "opina", "opine", "opino", 
        "optar", "optas", "optou", "orate", "orava", "orcai", "orcam", "orcar", "orcas", "orcou", 
        "ordem", "oreis", "orfao", "orgia", "oribe", "orlar", "ornar", "ornas", "ornea", "ornes", 
        "ornou", "oscar", "oscar", "oscas", "oscos", "ossea", "osseu", "ostra", "otica", "otico", 
        "otilo", "otimo", "ougar", "ourar", "ouras", "ourei", "ourem", "ouros", "ousai", "ousam", 
        "ousar", "ousas", "ousei", "ousem", "ouses", "ousia", "ousou", "ouvem", "ouvir", "ouvis", 
        "ouviu", "ovais", "ovalo", "oveis", "oxala", "oxida", "oxide", "oxido", "ocupe", "pacas", 
        "pairo", "pajem", "palas", "palco", "paleo", "palha", "palma", "palmo", "pampa", "panal",
        "panca", "panda", "pando", "panos", "papal", "papar", "papas", "papos", "papou", "parai",
        "param", "parar", "paras", "parei", "parem", "pares", "paria", "parir", "pariu", "parka",
        "parou", "parta", "parte", "parti", "parto", "parva", "parvo", "passe", "passo", "pasta",
        "paste", "pasto", "patas", "patos", "pavio", "pavor", "pecar", "pecas", "pecha", "pecou",
        "pedal", "pedem", "pedes", "pedia", "pedir", "pedis", "pediu", "pedra", "pegai", "pegam",
        "pegar", "pegas", "pegou", "pegue", "peida", "peide", "peido", "peina", "peita", "peite",
        "peito", "peixe", "pelai", "pelam", "pelar", "pelas", "pelei", "pelem", "peles", "pelos",
        "pelou", "penai", "penal", "penam", "penar", "penas", "penca", "penda", "pende", "pendi",
        "pendo", "penei", "penem", "penes", "penha", "penou", "pensa", "pense", "penso", "penta",
        "penum", "peque", "peral", "peras", "perca", "perco", "perda", "perde", "perdi", "perla",
        "perno", "persa", "perto", "perua", "peruo", "pesai", "pesam", "pesar", "pesas", "pesca",
        "pesco", "pesei", "pesem", "peses", "pesos", "pesou", "peste", "petar", "petas", "petiz",
        "piada", "piado", "piais", "piano", "piar", "piava", "picas", "picar", "picha", "piche",
        "picho", "picos", "picou", "pidas", "pidos", "pifao", "pifar", "pifas", "pifou", "pigar",
        "pigar", "pijao", "pilai", "pilam", "pilar", "pilas", "pilei", "pilem", "piles", "pilha",
        "pilhe", "pilho", "pilou", "pimba", "pinar", "pinas", "pince", "pinga", "pingo", "pinha",
        "pinho", "pinos", "pinta", "pinte", "pinto", "pipas", "pipia", "pipio", "piqua", "piros",
        "pisai", "pisam", "pisar", "pisas", "pisei", "pisem", "pises", "pisos", "pisou", "pista",
        "piste", "pitao", "pitar", "pitao", "pitos", "placa", "placo", "plaga", "plana", "plane",
        "plano", "plebe", "plena", "pleno", "pobre", "podai", "podam", "podar", "podas", "podei",
        "podem", "poder", "podes", "podia", "podou", "podre", "poema", "poeta", "pogar", "poiai",
        "poiam", "poiar", "poias", "poico", "poide", "poisa", "polem", "polen", "poles", "polia",
        "polir", "polis", "poliu", "polja", "polje", "poljo", "polos", "polpa", "polvo", "pomar",
        "pomba", "pombo", "pomos", "pompa", "ponca", "pondo", "ponha", "ponho", "ponis", "ponto",
        "popes", "popos", "porei", "porem", "porei", "poria", "poros", "porra", "porre", "porta",
        "porte", "porto", "posai", "posam", "posar", "posas", "posei", "posem", "poses", "posou",
        "possa", "posse", "posso", "posta", "poste", "posto", "potas", "potes", "potra", "potro",
        "pouca", "pouco", "poupa", "poupe", "poupo", "pousa", "pouse", "pouso", "povoa", "povoe",
        "povoo", "praia", "prado", "praga", "praia", "prato", "prava", "preco", "preda", "prede",
        "predi", "predo", "pregu", "preia", "prelo", "presa", "prese", "preso", "preta", "preto",
        "preve", "previ", "prima", "prime", "primo", "prior", "presa", "presa", "proba", "probo",
        "proca", "proco", "prole", "prono", "prova", "prove", "provo", "proza", "prude", "pruma",
        "prume", "prumo", "pseca", "psico", "psoas", "pudim", "puela", "puido", "pular", "pular",
        "pulas", "pulei", "pulem", "pules", "pulga", "pulha", "pulou", "pumba", "punas", "punem",
        "punes", "punha", "punir", "punis", "puniu", "puras", "purei", "purem", "purga", "purse",
        "purgo", "putas", "putos", "puxai", "puxam", "puxar", "puxas", "puxei", "puxem", "puxes",
        "puxou", "puzos", "pacto", "padre", "pagam", "pagar", "pagas", "pagou", "paiol", "paira", 
        "paire", "quais", "quase", "quota", "quais", "queda", "quero", "quata", "quato", "quilo", 
        "quark", "queda", "queda", "quepa", "quepi", "quero", "quero", "quina", "quino", "quita",
        "quite", "quito", "queca", "quepe", "quejo", "quipa", "quipu", "quita", "quite", "quito",
        "quota", "rabos", "racha", "rache", "racho", "raiar", "raias", "raide", "raiou", "raiva", 
        "ralai", "ralam", "ralar", "ralas", "ralei", "ralem", "rales", "ralha", "ralhe", "ralho",
        "ralos", "ralou", "ramal", "ramas", "ramos", "rampa", "rance", "rango", "ranho", "rapai",
        "rapam", "rapar", "rapas", "rapaz", "rapei", "rapem", "rapes", "rapou", "rapta", "rapte",
        "rapto", "rasas", "rasca", "rasgo", "rasos", "raspa", "raspe", "raspo", "rasto", "ratai",
        "ratam", "ratar", "ratas", "ratei", "ratem", "rates", "ratio", "ratos", "ratou", "razia",
        "razao", "reais", "reata", "reate", "reato", "reavi", "rebar", "rebei", "reboa", "reboe",
        "reboo", "recai", "recar", "recem", "recha", "recre", "recta", "recto", "recua", "recue",
        "recuo", "redar", "redes", "redor", "reduz", "reege", "reena", "refaz", "refez", "refil",
        "regai", "regal", "regam", "regar", "regas", "regei", "regem", "reger", "reges", "regeu",
        "regia", "regio", "regou", "regra", "regre", "regro", "reiai", "reiam", "reias", "reide",
        "reina", "reine", "reino", "reiou", "reive", "reixa", "relai", "relam", "relas", "relei",
        "relem", "reles", "reler", "reles", "releu", "relia", "relva", "relva", "remar", "remas",
        "remel", "remem", "remes", "remir", "remis", "remiu", "remoa", "remoe", "remoo", "renal",
        "renda", "rende", "rendi", "rendo", "renga", "rengo", "rente", "repel", "repes", "repor",
        "repos", "repus", "retem", "reter", "retos", "retos", "reuma", "reuni", "reusa", "reuse",
        "reuso", "revem", "rever", "reviu", "rezai", "rezam", "rezar", "rezas", "rezei", "rezem",
        "rezes", "rezou", "riais", "riana", "riata", "ricas", "ricos", "richa", "riche", "rieis",
        "rifai", "rifam", "rifar", "rifas", "rifei", "rifem", "rifes", "rifle", "rifou", "rigor",
        "rimas", "rimos", "rindo", "rinha", "rinhe", "rinho", "ripas", "rique", "risse", "ritas",
        "ritos", "ritmo", "rival", "rixar", "rixei", "rixem", "rixes", "rixou", "roais", "roamo",
        "rocas", "rocei", "rocem", "roces", "rocha", "roche", "rocho", "rodai", "rodal", "rodam",
        "rodar", "rodas", "rodei", "rodem", "rodes", "rodos", "rodou", "roeis", "rogai", "rogam",
        "rogar", "rogas", "rogei", "rojem", "rojes", "rogou", "rolai", "rolam", "rolar", "rolas",
        "rolda", "rolei", "rolem", "roles", "rolha", "rolhe", "rolho", "rolim", "rolos", "rolou",
        "rombo", "romeu", "ronca", "ronco", "ronda", "ronde", "rondo", "rosal", "rosar", "rosas",
        "rosca", "rosco", "rosna", "rosne", "rosno", "rosto", "rotai", "rotam", "rotar", "rotas",
        "rotea", "rotei", "rotem", "rotes", "rotor", "rotos", "rotou", "rouba", "roube", "roubo",
        "rouca", "rouco", "round", "roupa", "roxas", "roxos", "royal", "ruano", "ruava", "rubem",
        "rublo", "rubor", "rubro", "rubra", "rudes", "rufai", "rufam", "rufar", "rufas", "rufeis",
        "rufem", "rufes", "rufia", "rufos", "rufou", "rugai", "rugam", "rugar", "rugas", "rugia",
        "rugir", "rugis", "rugiu", "rugou", "ruide", "ruina", "ruiva", "ruivo", "rujam", "rujas",
        "rumai", "rumam", "rumar", "rumas", "rumba", "rumem", "rumei", "rumes", "rumor", "rumou",
        "rural", "rurba", "rusga", "russa", "russo", "rusti", "rutil", "ruvou", "rajar", "sabei", 
        "sacho", "sacou", "sacra", "sacre", "sacro", "sadia", "sadio", "saete", "safra", "safre", 
        "sagas", "sages", "sagra", "sagre", "sagro", "saira", "saite", "salas", "saldo", "salem", 
        "sales", "salia", "salmo", "salou", "salsa", "salta", "salte", "salto", "salva", "salve", 
        "salvo", "samba", "sambe", "sambo", "samoa", "sanai", "sanam", "sanar", "sanas", "sanei", 
        "sanem", "sanes", "sanga", "sania", "sanou", "santo", "sapao", "sapos", "saque", "sarar", 
        "saras", "sarda", "sardo", "sarei", "sarem", "sares", "sarja", "sarro", "sarou", "sarta", 
        "sarte", "sarto", "satao", "satis", "saude", "sauva", "sauba", "sauna", "saxao", "sazao", 
        "seara", "sebei", "sebes", "secai", "secam", "secar", "secas", "secos", "secou", "sedar", 
        "sedas", "sedia", "sedie", "sedio", "seduz", "segar", "segas", "seita", "seiva", "seixo", 
        "selar", "selas", "selei", "selem", "seles", "selha", "selos", "selou", "selva", "semas", 
        "semba", "semen", "sendo", "senes", "senil", "senos", "senso", "sente", "senti", "sento", 
        "sepos", "sepse", "septa", "septo", "seque", "serao", "serem", "seres", "seria", "serie", 
        "serio", "serra", "serre", "serro", "servo", "sesta", "setar", "setas", "setor", "setos", 
        "sevar", "sevas", "sevei", "sevem", "seves", "sevia", "sevir", "sexis", "sexos", "sexta", 
        "sexto", "shock", "short", "shows", "siala", "sibao", "sidas", "sidra", "siena", "sifao", 
        "sigam", "sigas", "sigla", "sigma", "signo", "silas", "silva", "simas", "simba", "simbo", 
        "simio", "simpa", "sinal", "sinas", "since", "sinha", "sinhai", "sinou", "sinus", "sioux", 
        "sique", "sirio", "siria", "siris", "sismo", "sitio", "sitia", "sitio", "sitor", "sivia", 
        "sizer", "sobra", "sobre", "sobro", "socai", "socam", "socao", "socar", "socas", "socha", 
        "socho", "socou", "sodas", "sofra", "sofre", "sofri", "sogro", "solar", "solas", "solda", 
        "solde", "soldo", "solos", "solta", "solte", "solto", "somar", "sombe", "somou", "sonar", 
        "sonda", "sonde", "sondo", "sonha", "sonhe", "sonho", "sopro", "sorar", "sorbo", "sorda", 
        "sorgo", "sorna", "soros", "sorri", "sorta", "sorte", "soube", "souto", "sovas", "sovar", 
        "sozin", "spans", "staff", "stato", "stent", "stops", "suave", "suazi", "subam", "subas", 
        "subia", "subir", "subis", "subiu", "sucia", "sudao", "suela", "sueto", "sugar", "sugas", 
        "sugou", "suite", "sujar", "sujas", "sujos", "sulca", "sulco", "sumam", "sumas", "sumir", 
        "sumis", "sumiu", "sunga", "supor", "supra", "supre", "supri", "supro", "surda", "surdo", 
        "surge", "surgi", "surra", "surre", "surro", "sushi", "susto", "sutis", "sutil", "swing",
        "sabem", "saber", "sabes", "sabia", "sabio", "sabre", "sacam", "sacar", "sacas", "tabua", 
        "taloa", "talos", "tampa", "tampe", "tampo", "tanga", "tange", "tangi", "tango", "tanta",
        "tanto", "tapai", "tapam", "tapao", "tapar", "tapas", "tapei", "tapem", "tapes", "tapou",
        "tapua", "taque", "tarar", "taras", "tarca", "tarde", "tardo", "taria", "tarja", "tarot",
        "tarou", "tarpa", "tarra", "tarro", "tarte", "tatai", "tatam", "tatao", "tatar", "tatas",
        "tatei", "tatem", "tates", "tatuo", "tatus", "tatua", "taura", "tauro", "taxai", "taxam",
        "taxar", "taxas", "taxei", "taxem", "taxes", "taxia", "taxou", "teada", "teado", "teate",
        "tecer", "teces", "teceu", "tecia", "tedes", "teiga", "teigo", "teima", "teime", "teimo",
        "teipe", "teito", "teixe", "teixo", "tejas", "tejos", "telar", "telas", "telem", "telha",
        "telho", "telim", "telos", "temas", "temei", "temem", "temer", "temes", "temeu", "temia",
        "temos", "tempe", "tempo", "tenar", "tenaz", "tenda", "tende", "tendi", "tendo", "tenha",
        "tenho", "tenor", "tenra", "tenro", "tensa", "tense", "tenso", "tenta", "tente", "tento",
        "terao", "terca", "terco", "terei", "terem", "teres", "teria", "termo", "terna", "terno",
        "terra", "terro", "tesao", "teses", "tesla", "tesse", "testa", "teste", "testo", "tetas",
        "teteu", "tetra", "tetum", "teudo", "texas", "texte", "texto", "tiago", "tiara", "ticao",
        "ticas", "ticar", "ticos", "ticos", "tidas", "tidos", "tigra", "tigre", "tijol", "tilar",
        "tilha", "tilho", "tilos", "timao", "timas", "times", "timor", "tinas", "tinem", "tines",
        "tingi", "tinha", "tinho", "tinia", "tinir", "tinis", "tiniu", "tinja", "tinjo", "tipas",
        "tipos", "tipoi", "tipos", "tipou", "tique", "tiros", "tirai", "tiram", "tirar", "tiras",
        "tirei", "tirem", "tires", "tiros", "tirou", "tisne", "titio", "titua", "tiver", "tizas",
        "toada", "toado", "toais", "toamo", "toara", "toava", "tocai", "tocam", "tocao", "tocar",
        "tocas", "tocha", "tocia", "tocou", "todas", "todos", "toeis", "toemo", "toesa", "toesa",
        "toeta", "toira", "toiro", "tolar", "tolas", "tolda", "toldo", "toles", "tolha", "tolhe",
        "tolhi", "tolho", "tolos", "tomai", "tomam", "tomao", "tomar", "tomas", "tomba", "tombe",
        "tombo", "tomei", "tomem", "tomes", "tomos", "tomou", "tonai", "tonal", "tonam", "tonar",
        "tonas", "tonel", "tones", "tonho", "tonia", "tonou", "tonta", "tonto", "topai", "topam",
        "topar", "topas", "topei", "topem", "topes", "topou", "toque", "toqui", "toras", "torax",
        "torca", "torce", "torci", "torco", "torda", "tordo", "torio", "torna", "torne", "torno",
        "toros", "torou", "torpe", "torra", "torre", "torro", "torso", "torta", "torte", "torto",
        "torvo", "tosai", "tosam", "tosar", "tosas", "tosei", "tosem", "toses", "tosou", "tosse",
        "tosta", "toste", "tosto", "total", "totem", "touca", "touco", "touro", "traca", "trace",
        "traco", "trade", "trado", "traem", "traia", "trair", "trais", "traja", "traje", "trajo",
        "trama", "tramo", "trapo", "trara", "trata", "trate", "trato", "trava", "trave", "travo",
        "treco", "trela", "treme", "tremi", "trena", "treno", "trens", "trepa", "trepe", "trepo",
        "treta", "treva", "trevo", "treze", "triak", "trial", "trica", "trico", "trila", "trile",
        "trilo", "trina", "trino", "tripa", "tripe", "tripo", "trisa", "trise", "triso", "trita",
        "trite", "trito", "troar", "troca", "troce", "troco", "troes", "trofa", "troia", "trole",
        "trona", "trono", "troou", "tropa", "trote", "troto", "trova", "trove", "trovo", "truar",
        "truco", "trufa", "trufe", "trufo", "truta", "tubas", "tubar", "tubos", "tufao", "tufas",
        "tufos", "tugas", "tugir", "tugiu", "tumba", "tumor", "tunas", "tunel", "tunga", "tupis",
        "turba", "turbe", "turbo", "turco", "turfa", "turma", "turna", "turne", "turno", "turra",
        "turva", "turve", "turvo", "tutai", "tutam", "tutar", "tutas", "tutea", "tutei", "tutem",
        "tutes", "tutor", "tutou", "tuvao", "tweed", "twist", "types", "typus", "tabus", "tacar", 
        "tacas", "taipa", "talas", "talco", "talha", "talhe", "talho", "uando", "uanga", "uaris", 
        "ufano", "uiara", "uiari", "uiram", "uiras", "uitao", "uivas", "uivar", "uivei", "uivou",
        "ujica", "ulano", "ulhas", "ulhoa", "uliua", "ulmos", "ulnal", "ultra", "uluas", "umari",
        "umbla", "umblo", "umbra", "umbro", "unais", "unamo", "unara", "unava", "uncao", "uncas",
        "ungem", "unges", "ungia", "ungir", "ungis", "ungiu", "unhas", "uniam", "uniao", "unida",
        "unido", "unimo", "unira", "untai", "untam", "untar", "untas", "untei", "untem", "untes",
        "untor", "untou", "uraca", "urali", "urano", "urato", "urdam", "urdas", "urdem", "urdes",
        "urdia", "urdir", "urdis", "urdiu", "ureia", "urgem", "urges", "urgia", "urgir", "urgis",
        "urgiu", "urica", "urico", "urina", "urine", "urino", "urjam", "urjas", "urros", "ursao",
        "ursas", "ursos", "urubu", "urupa", "usada", "usado", "usais", "usamo", "usara", "usava",
        "useis", "usemo", "usina", "usual", "usura", "utado", "utata", "uteis", "utena", "utica",
        "utico", "utota", "uvada", "uvaia", "uxira", "uziel", "uaupe", "ucila", "ucima", "ucuba", 
        "udora", "uebas", "ufana", "vacas", "vadio", "vagal", "vagem", "vagir", "vaiar", "vaias", 
        "valha", "valho", "valia", "valor", "valos", "vamos", "vapor", "varal", "varar", "varas",
        "varia", "varie", "vario", "varou", "varra", "varre", "varri", "vasal", "vasco", "vasos",
        "vasto", "vazai", "vazam", "vazao", "vazar", "vazas", "vazei", "vazem", "vazes", "vazia",
        "vazio", "vazou", "veado", "vedai", "vedam", "vedar", "vedas", "vedei", "vedem", "vedes",
        "vedou", "veias", "veiga", "veios", "vejam", "vejas", "velai", "velam", "velar", "velas",
        "velei", "velem", "veles", "velha", "velho", "velou", "vemos", "vence", "venci", "venda",
        "vende", "vendi", "vendo", "venha", "venho", "vento", "venus", "veras", "verao", "verbo",
        "verde", "verei", "verem", "veres", "verga", "verge", "vergo", "veria", "veril", "verme",
        "verna", "vesga", "vesgo", "veste", "vesti", "vetai", "vetam", "vetar", "vetas", "vetei",
        "vetem", "vetes", "vetor", "vetos", "vetou", "vexai", "vexam", "vexar", "vexas", "vexei",
        "vexem", "vexes", "vexou", "viaja", "viaje", "viajo", "vibra", "vibre", "vibro", "vicao",
        "vicia", "vicie", "vicio", "vidas", "video", "viera", "vigas", "vigia", "vigie", "vigio",
        "vigor", "vilao", "vilas", "vilma", "vimos", "vinca", "vinco", "vinda", "vindo", "vines",
        "vinga", "vingo", "vinha", "vinho", "vinis", "viola", "viole", "violo", "virai", "viram",
        "virao", "virar", "viras", "virei", "virem", "vires", "viria", "virao", "viros", "virou",
        "visai", "visam", "visao", "visar", "visas", "visei", "visem", "vises", "visgo", "visma",
        "visos", "visou", "vista", "viste", "visto", "vitao", "vital", "vivas", "viver", "vives",
        "viveu", "vivia", "vivos", "voada", "voado", "voamo", "vocal", "vodca", "vodka", "voeis",
        "voemo", "vogai", "vogal", "vogam", "vogar", "vogas", "vogou", "volar", "volta", "volte",
        "volto", "vonda", "voraz", "votai", "votam", "votao", "votar", "votas", "votei", "votem",
        "votes", "votos", "votou", "vovos", "vovoz", "vralo", "vulgo", "vulto", "vulva", "valas", 
        "valer", "valeu", "xales", "xampu", "xangô", "xaria", "xebec", "xedor", "xenia", "xenon",
        "xetra", "xexel", "xicar", "xiclo", "xifre", "xilol", "xinga", "xingo", "xique", "xisto",
        "xucro", "xukru", "xerez", "xerox", "zabra", "zacas", "zafar", "zagas", "zaino", "zaire", 
        "zarpa", "zarpe", "zarpo", "zebra", "zebro", "zelai", "zelam", "zelar", "zelas", "zelei",
        "zelem", "zeles", "zelos", "zelou", "zenda", "zende", "zenir", "zerai", "zeram", "zerar",
        "zeras", "zerei", "zerem", "zeres", "zeros", "zerou", "zetas", "zicam", "zicar", "zicas",
        "zicha", "zicho", "zidos", "zinco", "zinei", "zinem", "zines", "zinga", "zinga", "zomba",
        "zombe", "zombo", "zonas", "zorra", "zorro", "zumbi", "zunar", "zunas", "zunem", "zunes",
        "zunia", "zunir", "zunis", "zuniu", "zurpa", "zambi", "zanga", "zango", "zante"
    ];


    const keys = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
        'z', 'x', 'c', 'v', 'b', 'n', 'm',
        'enter', 'backspace'
    ];

    closeNotificationBtn.addEventListener('click', () => {
        notificacao.classList.remove('opacity-100');
        notificacao.classList.add('opacity-0');
    });

    function startGame() {
        secretWord = wordsList[Math.floor(Math.random() * wordsList.length)];
        console.log('Palavra Secreta:', secretWord);  // Para testes, remova ou comente isso em produção
        createBoard();
        createKeyboard();
    }

    function createBoard() {
        for (let i = 0; i < maxAttempts * 5; i++) {
            const box = document.createElement('div');
            box.className = 'letter-box w-14 h-14 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center border-4 border-gray-500 rounded-md text-xl sm:text-2xl font-bold uppercase bg-gray-700 text-white cursor-pointer';
            box.addEventListener('click', () => selectBox(i));
            board.appendChild(box);
        }
    }

    function selectBox(index) {
        const rowStart = currentRow * 5;
        const rowEnd = rowStart + 5;
        if (index >= rowStart && index < rowEnd) {
            currentCol = index - rowStart;
            document.querySelectorAll('.letter-box').forEach((box, idx) => {
                if (idx >= rowStart && idx < rowEnd) {
                    box.classList.remove('border-gray-800');
                }
            });
            document.querySelectorAll('.letter-box')[index].classList.add('border-gray-800');
        }
    }

    function createKeyboard() {
        keys.forEach(key => {
            const keyElement = document.createElement('button');
            keyElement.textContent = key === 'backspace' ? '⌫' : key;
            keyElement.className = 'key bg-gray-600 text-white font-bold uppercase rounded hover:bg-gray-500 flex items-center justify-center';
            keyElement.setAttribute('data-key', key);
    
            // Verifica se a tecla é 'enter' ou 'backspace' para aplicar `col-span-2`
            if (key === 'enter' || key === 'backspace') {
                keyElement.classList.add('col-span-2', 'w-full', 'h-full');
            } else {
                keyElement.classList.add('w-8', 'h-10', 'sm:w-10', 'sm:h-12', 'md:w-12', 'md:h-14');
            }
    
            keyElement.addEventListener('click', () => handleKeyPress(key));
            keyboard.appendChild(keyElement);
        });
    }
    

    function handleKeyPress(key) {
        if (gameEnded) return;

        if (key === 'enter') {
            checkWord();
        } else if (key === 'backspace') {
            deleteLetter();
        } else {
            addLetter(key);
        }
    }

    function addLetter(letter) {
        if (currentCol < 5 && currentRow < maxAttempts) {
            const index = currentRow * 5 + currentCol;
            const letterBox = document.querySelectorAll('.letter-box')[index];
            letterBox.textContent = letter;
            currentCol++;
            if (currentCol < 5) {
                selectBox(currentRow * 5 + currentCol);  // Move cursor to next box automatically
            }
        }
    }

    function deleteLetter() {
        if (currentCol > 0) {
            currentCol--;
            const index = currentRow * 5 + currentCol;
            const letterBox = document.querySelectorAll('.letter-box')[index];
            letterBox.textContent = '';
            selectBox(index);  // Move cursor to the deleted box
        }
    }

    function checkWord() {
        const rowStart = currentRow * 5;
        const rowEnd = rowStart + 5;
    
        // Verifica se todas as 5 caixas estão preenchidas
        const isRowComplete = Array.from(document.querySelectorAll('.letter-box'))
            .slice(rowStart, rowEnd)
            .every(box => box.textContent !== '');
    
        if (!isRowComplete) {
            showNotification('Complete a palavra!');
            return;
        }
    
        const guess = Array.from(document.querySelectorAll('.letter-box'))
            .slice(rowStart, rowEnd)
            .map(box => box.textContent.toLowerCase())
            .join('');
    
        if (!wordsList.includes(guess)) {
            showNotification('Palavra não encontrada!');
            return;
        }
    
        const letterCount = {}; // Para contar a frequência das letras na palavra secreta
    
        // Primeiro, contamos as letras na palavra secreta
        for (const letter of secretWord) {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }
    
        // Verificar letras na posição correta (verde)
        for (let i = 0; i < 5; i++) {
            const index = currentRow * 5 + i;
            const letterBox = document.querySelectorAll('.letter-box')[index];
            const letter = guess[i];
            const keyElement = document.querySelector(`.key[data-key="${letter}"]`);
    
            if (letter === secretWord[i]) {
                letterBox.classList.add('bg-green-500');
                keyElement.classList.add('bg-green-500');
                letterCount[letter]--; // Reduz a contagem desta letra
            }
        }
    
        // Verificar letras que estão na palavra secreta mas em posição errada (amarelo) ou não estão na palavra (marrom)
        for (let i = 0; i < 5; i++) {
            const index = currentRow * 5 + i;
            const letterBox = document.querySelectorAll('.letter-box')[index];
            const letter = guess[i];
            const keyElement = document.querySelector(`.key[data-key="${letter}"]`);
    
            if (!letterBox.classList.contains('bg-green-500')) { // Se a letra não está correta na posição
                if (secretWord.includes(letter) && letterCount[letter] > 0) {
                    letterBox.classList.add('bg-yellow-500');
                    if (!keyElement.classList.contains('bg-green-500')) {
                        keyElement.classList.add('bg-yellow-500');
                    }
                    letterCount[letter]--; // Reduz a contagem desta letra
                } else {
                    letterBox.classList.add('bg-gray-800'); // Usamos uma cor cinza escura para letras que não existem
                    if (!keyElement.classList.contains('bg-green-500') && !keyElement.classList.contains('bg-yellow-500')) {
                        keyElement.classList.add('bg-gray-800');
                    }
                }
            }
    
            // Remove hover effect after key has been used
            keyElement.classList.remove('hover:bg-gray-500');
        }
    
        if (guess === secretWord) {
            showNotification('Parabéns! Você acertou a palavra!');
            showNotificationMessage('FELIZ DIA DOS PAIS!');
            gameEnded = true;
        } else {
            currentRow++;
            currentCol = 0;
    
            if (currentRow === maxAttempts) {
                showNotification('Fim de jogo! A palavra era: ' + secretWord);
                showNotificationMessage('FELIZ DIA DOS PAIS!');
                gameEnded = true;
            } else {
                // Remove borda amarela da linha anterior
                Array.from(document.querySelectorAll('.letter-box'))
                    .slice(rowStart, rowEnd)
                    .forEach(box => box.classList.remove('border-gray-800'));
    
                // Move para a primeira caixa da próxima linha
                selectBox(currentRow * 5);
            }
        }
    }
    

    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.classList.remove('opacity-0');
        notification.classList.add('opacity-100');

        setTimeout(() => {
            notification.classList.remove('opacity-100');
            notification.classList.add('opacity-0');
        }, 2000); // O pop-up desaparece após 2 segundos
    }

    function showNotificationMessage(message) {
        notificationMessagens.textContent = message;        
        notificacao.classList.remove('opacity-0');
        notificacao.classList.add('opacity-100');
    } 


    startGame();
});
