    var w = 500;
    var h = 500;
    var dataset = [5, 10, 15, 20, 25];
    var point_dataset = [];

    for(var i=0; i < 50 ; i ++){
      var num_x = Math.random() * 500;
      var num_y = Math.random() * 500;
      var array = [num_x, num_y];
      point_dataset.push(array);
    }


    var yScale = d3.scale.linear()
        .domain([0, 20])
        .range([0, 500])
        .nice();



    var svg = d3.select("body").append("svg").attr({
        width: w,
        height: h
    });
    var svg2 = d3.select("body").append("svg").attr({
        width: w,
        height: h
    });

    var rect = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr({
            x: function(d, i) {
                return i * 25;
            },
            y: function(d) {
                return h - (d * 10)
            },
            width: 20,
            height: function(d) {
                return d * 10
            },
            fill: "green"
        });

    svg2.selectAll("circle")
        .data(point_dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return d[0];
        })
        .attr("cy", function(d) {
            return d[1];
        })
        .attr("r", 5);

