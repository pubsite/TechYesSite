/*
 * 一卷图库 - Monoroll Galllery
 * 
 */
// 

let MG = {}

fetch("index.json")
    .then(res => res.json())
    .then(index => {
        MG.index = index
        MG.showDetail()
        MG.getEach(MG.index.file)
    })

MG.showDetail = () => {
    console.log(MG.index.name + "\n" + MG.index.description)
}

MG.getEach = files => {
    for (i in files)
        fetch(files[i])
            .then(res => res.json())
            .then(pics => {
                for (i in pics) {
                    
                }
            })
}


