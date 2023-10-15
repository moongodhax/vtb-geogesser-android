import React, { useState, useEffect } from "react";
import { Text, View, TouchableWithoutFeedback, TextInput, Image } from 'react-native';
import s from "../styles/Style.jsx";
import HeaderSmall from "../components/HeaderSmall.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faSliders, faPersonWalking, faCar, faBus } from "@fortawesome/free-solid-svg-icons";

import { WebView } from 'react-native-webview';

import yahtml from '../components/YaMapsHTML.jsx';

const API_HOST = "http://192.168.1.130:5000/api/v1";
const AVG_TIME = 10;

export default function Main() {
    let filters = [["individual", "Физическое лицо"], ["entity", "Юридическое лицо"], ["atm", "Банкоматы"]];
    let routes = [['pedestrian', faPersonWalking], ['car', faCar], ['public', faBus]];
    const [filterOpened, setfilterOpened] = useState(false);
    const [filterMain, setfilterMain] = useState('individual');
    const [routeType, setrouteType] = useState('pedestrian');
    const [addr, setaddr] = useState('');
    const [km, setkm] = useState('Загрузка...');
    this.webref = React.createRef();

    const [bestOffices, setbestOffices] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "serviceId": "7abc7848-43ea-48f9-b685-3623462845ba",
                "inclusionIds": []
            })
        };

        fetch(`${API_HOST}/offices/best`, requestOptions)
        .then((response) => response.json())
        .then(function(offices) { 
            setbestOffices(offices.data);
            setaddr(offices.data[0].address);
        });
    }, []);

    
    useEffect(() => {
        this.webref.current?.injectJavaScript(`
            showRoute('${addr}');
            true;
        `);
    }, [this.webref]);

    return (
        <>
            <View style={[{ padding: 0, paddingTop: 30, height: "75%" },]}>
                <WebView 
                    ref={this.webref}
                    onMessage={(event) => { setkm(event.nativeEvent.data.replace("&#160;", " ")) }}
                    originWhitelist={['*']} source={{ html: yahtml }} />
            </View>

            <View style={[
                s.containerCol, 
                { flexDirection: 'column', padding: 0, paddingTop: 25, marginTop: -40, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                { position: "absolute", top: 670, left: 0, right: 0 }
            ]}>

                <View style={[ s.rowContainer ]} >
                    <TextInput
                        style={ [s.addressField] }
                        placeholder="Город, район, улица, метро"
                    />
                    <TouchableWithoutFeedback onPress={() => setfilterOpened(!filterOpened)}>
                        <View style={[ s.filterHorizontal, { display: "flex", alignItems: "center", justifyContent: "center",  } ]}>
                            <FontAwesomeIcon size={20} style={[{color: filterOpened ? '#0D69F2' : "#626F84"}]} icon={faSliders} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={[s.rowContainer, { display: !filterOpened ? 'none' : 'flex' } ]} >
                    { filters.map(value => (
                        <TouchableWithoutFeedback key={value[0]} onPress={() => setfilterMain(value[0])}>
                            <View style={ [ s.button, filterMain == value[0] && s.buttonActive ] } >
                                <Text style={ [ s.buttonText, filterMain == value[0] && s.activeButtonText ] }>{value[1]}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>

                <View style={{ backgroundColor: '#fff', padding: 20, paddingTop: 0 }} >
                    <HeaderSmall>Тип маршрута</HeaderSmall>
                    <View style={[s.rowContainer, { padding: 0, marginTop: 15, marginBottom: 20 } ]} >
                        { routes.map(value => (
                            <TouchableWithoutFeedback key={value[0]} onPress={() => setrouteType(value[0])}>
                                <View style={[ s.filterHorizontal,  { display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 0, marginRight: 10, } ]}>
                                    <FontAwesomeIcon size={20} style={[{color: routeType == value[0] ? '#0D69F2' : "#626F84"}]} icon={value[1]} />
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>

                    <HeaderSmall>Оптимальное отделение</HeaderSmall>

                    {bestOffices.length > 0 ? 
                        <View style={[ s.containerCol, {padding: 0, flexWrap: 'wrap', marginTop: 15} ]}>
                            <View style={[{display: "flex", flexDirection: "row", width: "100%", marginBottom: 10}]}>
                                <View style={[ {marginRight: 10, width: 75 } ]}>
                                    <Image source={require('../assets/img/vtb-logo-small.png')} style={{width: 40, height: 40}} />
                                </View>
                                <View style={[ { flex: 1 }]}>
                                    <Text style={[s.defaultText,]}>{ bestOffices[0].address }</Text>
                                </View>
                                <View style={[ {marginLeft: 10, width: 100 }]}><Text style={[s.blueText, {textAlign: "right"} ]}>{km}</Text></View>
                            </View>
                            <View style={[ {display: "flex", flexDirection: "row", width: "100%"} ]}>
                                <View style={{flex: 1}}>
                                    <HeaderSmall>Время в дороге</HeaderSmall>
                                    <Text>3 минуты</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <HeaderSmall>Время ожидания</HeaderSmall>
                                    <Text>{ bestOffices[0].queuescount * AVG_TIME } минут</Text>
                                </View>
                            </View>
                        </View>
                        :
                        null
                    }
                </View>
            </View>
        </>
    );
}

