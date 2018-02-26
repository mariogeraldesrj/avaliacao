var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    flash                 = require("connect-flash"),
    User                  = require("./models/user"),
    Curriculo             = require("./models/curriculo"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride        = require("method-override"),
    expressSanitizer      = require("express-sanitizer")
    
var curriculoRoutes  = require("./routes/curriculo"),
    usuarioRoutes    = require("./routes/usuario"),
    indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://localhost/curriculo");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "batata123",
    resave: false,
    saveUninitialized: false
}));



app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});



app.use("/", indexRoutes);
app.use("/curriculos",curriculoRoutes);
app.use("/usuarios",usuarioRoutes);

app.listen(8080, function(){
    console.log("Serviço de Curriculos iniciado!");
})
