    var w = 500;
    var h = 500;
    var eps = Math.exp(-15);
    var point_dataset = [];
    var char_dataset = [];
    var positions = [];
    var colors = ["blue", "green", "yellow", "orange", "red"];

    console.log(eps);

    for (var i = 0; i < 50; i++) {
        var num_x = Math.random() * 500;
        var num_y = Math.random() * 500;
        var value = Math.random() * 100;
        var array = [num_x, num_y, value];
        point_dataset.push(array);
        positions.push({x:num_x, y:num_y, z:value});
    }


    var svg = d3.select("body").append("svg").attr({
        width: w,
        height: h
    });

    var svgoverlay = svg.append("g");

    svg.selectAll("circle")
        .data(point_dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return d[0];
        })
        .attr("cy", function(d) {
            return d[1];
        })
        .attr("cz", function(d){
            return d[2];
        })
        .attr("r", 3);


    var voronoi = d3.geom.voronoi()
        .x(function(d) {
            return d.x })
        .y(function(d) {
            return d.y });

    //ドロネー座標データ取得
    var delaunay = voronoi.triangles(positions);
    var delaunay_links = voronoi.links(positions);

    console.log(delaunay_links);

    //ドロネー図パス描画
    var du = svgoverlay.selectAll("delaunay_path")
        .data(delaunay)
        .enter()
        .append("path")
        .attr("d", function(dd, i) {
            return "M" + dd.map(function(d) {
                return [d.x, d.y]
            }).join("L") + "Z";
        })
        .attr({
            stroke: "blue",
            fill: "none",
            "stroke-width": 1
        });

    var isCharSide = function(zi, zj, zlevel) {
        zi = zi - eps;
        zj = zj - eps;
        return (zi - zlevel) * (zj - zlevel) < 0
    };

    for(var i = 20; i < 101; i+=20){
        console.log("loop");
        delaunay_links.forEach(function(value, index, ar){
            var zlev = i;
            // console.log(value);
            if (isCharSide(value.source.z, value.target.z, zlev)) {
                var char_x = value.source.x + (value.target.x - value.source.x) * (zlev - value.source.z) / (value.target.z - value.source.z);
                var char_y = value.source.y + (value.target.y - value.source.y) * (zlev- value.source.z) / (value.target.z - value.source.z);
                var char_array = [char_x, char_y, zlev];
                char_dataset.push(char_array);
            }
        });
        svg.selectAll("char-circle")
            .data(char_dataset)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return d[0];
            })
            .attr("cy", function(d) {
                return d[1];
            })
            .attr("cz", function(d){
                return d[2];
            })
            .attr("r", 3)
            .attr("fill", colors[i/20 - 1])
            .attr("type", "charpoint");

        char_dataset.length = 0;
    }

        console.log(du);


