
const f1Module = require('./f1');
const f2Module = require('./f2');
const f3Module = require('./f3');
const f4Module = require('./f4');
const dpModule = require('./deploy');
for(var i in f1Module) {
    exports[i] = f1Module[i];
}
for(var i in f2Module) {
    exports[i] = f2Module[i];
}
for(var i in f3Module) {
    exports[i] = f3Module[i];
}
for(var i in f4Module) {
	exports[i] = f4Module[i];
}
for(var i in dpModule) {
	exports[i] = dpModule[i];
}
