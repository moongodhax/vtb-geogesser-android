const html = `
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Примеры. Размещение карты на странице.</title>
        <script src="https://api-maps.yandex.ru/2.1/?apikey=2d3d014b-4ee9-4bd9-9e0c-57a03513129a&lang=ru_RU" type="text/javascript"></script>
    <style>
            body, html {
                padding: 0;
                margin: 0;
                width: 100%;
                height: 100%;
            }
            #map {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>

    <body>
        <div id="map"></div>
    </body>
    
    <script>
        var flag = false;
        var myMap;
        ymaps.ready(init);
        function init () {
            // alert('init');
            myMap = new ymaps.Map('map', {
                center: [56.187590, 36.967926], // Москва
                zoom: 17
            });
        }
        function showRoute(address) {
            //alert('123' + address);

            if (flag) return;
            if (address?.length) flag = true;
            else return;

            ymaps.route(['1-я Володарская улица, 46А, Солнечногорск, Московская область, 141503', address], {mapStateAutoApply:true}).then(
                function(route) {
                    //alert('успех');
                    myMap.geoObjects.add(route);
                    window.ReactNativeWebView.postMessage(route.getHumanLength());
                },
                function(error) {
                    //alert('Невозможно построить маршрут');
                }
            );
        }
    </script>
</html>
`;

export default html;