// Exported from snack.expo.io
import Expo from 'expo';
import React, { Component } from 'react';
import {View,Text, TouchableHighlight, StyleSheet} from 'react-native';

const buttons = [
    ['c', 'ce', '±', '%'],
    [7, 8, 9, '/'],
    [4, 5, 6, '*'],
    [1, 2, 3, '-'],
    [0, '.', '=', '+'],
    ['π','γ', 'e', 'φ']
];

export default class ReactCalculator extends Component {

    constructor(props) { 
        super(props);

        this.initialState = { 
            temp: 0.0,
            inputValue: 0.0,
            selectedOperation: null,
            dot:true,
            divide:10.0
        };

        this.state = this.initialState;
    }
    
     _selectedButtons() {

        let views = buttons.map((row, idx) => {
            let inputRow = row.map((buttonValue) => {
                return <SelectedButton
                            value={buttonValue}
                            onPress={this._buttonPressed.bind(this, buttonValue)}
                            />;
            });

            return <View style={Style.inputRow} key={'row-' + idx}>{inputRow}</View>;
        });

        return views;
    }

    _buttonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._inputNumber(input);
            default:
                return this._calculate(input);
        }
    }

    _inputNumber(num) {
        
        if(this.state.dot){
        let inputValue = (this.state.inputValue * 10.0) + num;
        this.setState({
            inputValue: inputValue
        });
        }
        else
        {
          let inputValue = ((this.state.inputValue * this.state.divide) + num)/this.state.divide; 
          
           this.setState({
            divide:this.state.divide*10,
            inputValue: inputValue
            
        });
        }

        
    }

    _calculate(str) {
      
if(str=='+'||str=='-'||str=='/'||str=='*'||str=='%')
{
   this.setState({
                    dot:true,
                    selectedOperation: str,
                    temp: this.state.inputValue,
                    divide:10.0,
                    inputValue: 0.0
                });
}

if(str=='=')
{
               let  operation = this.state.selectedOperation,
                    inputValue = this.state.inputValue,
                    temp = this.state.temp;

                if (!operation) 
                {
                    return;
                }
                
                  this.setState({
                    temp: 0.0,
                    inputValue: eval(temp + operation + inputValue),
                    selectedOperation: null
                });
}

else if(str=='ce')
{
    this.setState(this.initialState);
}

else if(str=='c')
{
   this.setState({inputValue: 0.0});
}

else if(str=='±')
{
   this.setState({
                    inputValue: this.state.inputValue*(-1.0)
                });
}
else if(str=='.')
{
  this.setState({ dot:false});
}

switch(str){
   case 'π':
   this.setState({inputValue: 3.14 });
   break;
   case 'γ':
   this.setState({inputValue: 0.52 });
   break;
   case 'e':
   this.setState({inputValue: 2.71 });
   break;
   case 'φ':
   this.setState({inputValue: 1.68 });
   break;
}


    }
    

    render() {
        return (
          
            <View style={Style.mainContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._selectedButtons()}
                </View>
            </View>
        );
    }

}

export class SelectedButton extends Component {
    
    render() {
        return (
            <TouchableHighlight style={[Style.selectedButton, this.props.highlight ? Style.selectedButtonHighlighted : null]}
                                underlayColor="#db7093"
                                onPress={this.props.onPress}>
                <Text style={Style.selectedButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }
    
}

var Style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 3,
        backgroundColor: '#db7093',
        justifyContent: 'center'
    },

    displayText: {
        color: '#4b0082',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },

    inputContainer: {
        flex: 7,
        backgroundColor: '#d8bfd8'
    },

    selectedButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#db7093'
    },

    selectedButtonHighlighted: {
        backgroundColor: '#db7093'
    },

    selectedButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4b0082'
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }
});
Expo.registerRootComponent(ReactCalculator);
