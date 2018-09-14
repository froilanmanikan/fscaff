function get_strip(lot_id_elem,leading_equip,succeeding_equip) {
    var thisLotidElement = $(lot_id_elem);
    var lot_id = thisLotidElement.text();

    var data={};
    data["lot_id"] = lot_id;
    data["leading_equipment_id"] = leading_equip;
    data["succeeding_equipment_id"] = succeeding_equip;

    var strip_id = "";
    $.ajax({
        url: "/get_strip",
        method: "POST",
        contentType: "application/json",
        data:JSON.stringify(data),
        beforeSend: function(){
            $("#wait").css("display", "block");
        },
        success: function(response){
            $(".modal-body").html("");
            $.each(response['strip_id'],function(){
                strip_id += "<h4>"+ this['strip_id'] + "</h4>";
            }),
            $(".modal-body").append(strip_id);
            // $(".modal-body").append("<h1><p>Coming Soon...</p></h1>");
        },
        complete: function(){
            $("#wait").css("display", "none");
        }
    });
}

function doughnut_chart(canvas_id,data){
    $("#wait").css("display", "block");
    var data = data;
    var completed;
    if (data >100) {
        completed = data;
    }else{
        completed = 100
    };
    var myDoughnutChart = new Chart(canvas_id, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [data, completed - data],
                backgroundColor:['#8ded84','#9da09d'],
                borderColor:['green','gray'],
                borderWidth: 1
            }],
            labels: [
                (data +' % Completed'),
                (completed-data +' % Unprocessed'),
            ],
        },
    });
    $("#wait").css("display", "none");
}
