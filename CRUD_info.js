db.[Model].create({stuff: "Here"})
.then(function(thing) {
  res.send(thing);
});

db.[Model].find(1)
.then(function(thing) {
 res.send(thing);
});

db.[Model].find(1)
.then(function(thing) {
  thing.updateAttributes({ oneAttr: "yo",
                           stuff: "Yay"})
  .then(function(imDone) {
   res.send(imDone);
  });
});

db.[Model].find(1)
.then(function(thing) {
  thing.destroy()
  .then(function(imDone) {
   res.redirect('/');
  });
});