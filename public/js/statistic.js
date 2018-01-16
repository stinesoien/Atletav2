
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Måned', 'Antall besøkt'],
            ['August', Math.floor((Math.random() * 31) + 1)],
            ['September', Math.floor((Math.random() * 31) + 1)],
            ['Oktober', Math.floor((Math.random() * 31) + 1)],
            ['November', Math.floor((Math.random() * 31) + 1)],
            ['Desember', Math.floor((Math.random() * 31) + 1)],
            ['Januar', Math.floor((Math.random() * 31) + 1)]
        ]);

        var options = {
            title: 'Min treningsstatistikk',
            hAxis: {title: 'Måneder'},
            vAxis: {title: 'Dager'},
            colors: ['#f44336'],
            width: 501.2,
            height: 250
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));

        chart.draw(data, options);

    }