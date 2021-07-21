function formatGridId(col, row) {
    return col < 10 ? row + "0" + col : "" + row + col
}

addLayer("BA", {
    name: "Bad Apple",
    symbol: "BA", 
    position: 0,
    row: 0,
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "points",

    tabFormat: [
        "grid",
        ["clickable", "state-changer"]
    ],

    grid: {
        cols: 32, //640
        rows: 24, //480

        getStartData(id) {
            return "#FFFFFF"
        },

        getStyle(data, id) {
            return {
                "background-color": data,
                "width": "20px",
                "height": "20px"
            }
        }
    },

    clickables: {
        "state-changer": {
            display() {
                return player[this.layer].running ? "Pause" : "Run"
            },

            canClick() {
                return true
            },

            onClick() {
                player[this.layer].running = !player[this.layer].running
            },
        }
    },

    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        currentFrame: 0,
        running: false,
    }},

    update(diff) {
        if(player[this.layer].running) {
            player[this.layer].currentFrame++
            //video.currentTime = player[this.layer].currentFrame / 20
            //ctx.drawImage(video, 0, 0, 32, 24)
            //map[player[this.layer].currentFrame.toString()] = {}
            for (var x = 1; x <= 32; x++) {
                //map[player[this.layer].currentFrame.toString()][x.toString()] = {}
                for (var y = 1; y <= 24; y++) {
                    //var data = ctx.getImageData(x, y, 1, 1).data
                    setGridData(this.layer, formatGridId(x, y), images[player[this.layer].currentFrame.toString()][x.toString()][y.toString()])
                    //console.log(ctx.getImageData(x, y, 1, 1).data[0].toString(16) + ctx.getImageData(x, y, 1, 1).data[1].toString(16) + ctx.getImageData(x, y, 1, 1).data[2].toString(16))
                    //map[player[this.layer].currentFrame.toString()][x.toString()][y.toString()] = "#" + (data[0].toString(16).length == 2 ? data[0].toString(16) : "0" + data[0].toString(16)) + (data[0].toString(16).length == 2 ? data[0].toString(16) : "0" + data[0].toString(16)) + (data[0].toString(16).length == 2 ? data[0].toString(16) : "0" + data[0].toString(16))
                }
            }

        }
    },

    baseAmount() {return player.points},
    layerShown(){return true}
})
