    var w = 500;
    var h = 500;
    var point_dataset = [];
    var positions = [];




    for (var i = 0; i < 50; i++) {
        var num_x = Math.random() * 500;
        var num_y = Math.random() * 500;
        var array = [num_x, num_y];
        point_dataset.push(array);
        positions.push({x:num_x, y:num_y});
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
        .attr("r", 3);


    var voronoi = d3.geom.voronoi()
        .x(function(d) {
            return d.x })
        .y(function(d) {
            return d.y });

    //ドロネー座標データ取得
    var delaunay = voronoi.triangles(positions);

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

        console.log(du);
