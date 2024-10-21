


// id, name, artist, album, and uri.


araaa = [
    {id:1, name:"hello1", nope:"nei", artist:"Dude", album:"Boi", uri:"ddddddd"},
    {id:2, name:"hello1", artist:["Dude"], nope:"nei", album:"Boi", uri:"ddddddd"},
    {id:3, name:"hello1", artist:["Dude1","Dude2"], album:"Boi", uri:"ddddddd", nope:"nei"},
    {nope:"nei",id:4, name:"hello1", artist:"Dude", album:"Boi", uri:"ddddddd"},
    {id:5, name:"hello1", artist:"Dude", album:"Boi", uri:"ddddddd"},
    {id:6, name:"hello1",nope:"nei", artist:"Dude", album:"Boi", uri:"ddddddd"},,
    {id:7, name:"hello1",nope:"nei", artist:"Dude", album:"Boi", uri:"ddddddd"},
    {id:8, name:"hello1", artist:"Dude", album:"Boi",nope:"nei", uri:"ddddddd"},
    {id:9, name:"hello1", artist:"Dude",nope:"nei", album:"Boi", uri:"ddddddd"}
]

ara2 = [
    {
    id:2,
    name:"Bob",
    id:5,
    name:"Carls"
    }
]




const test = [];
araaa.forEach((obje) => {
    const keys = Object.keys(obje);
    if (keys.includes("name")) {
        test.push(obje.id);
    };

});


console.log("TEST! "+ test[0].name,+"\n\n\n\n"+test[1],test[2],test[3],test[4]+ "\n")
console.log("TEST2 "+test)


//console.log(`${araaa[1].name}, ${araaa[1].artist}`);
//console.log(`${araaa[1].name} ${araaa[2].artist} test `);
