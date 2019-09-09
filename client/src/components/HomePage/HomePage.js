import React, { Component } from 'react';
import Styles from './styles';
import {connect} from "react-redux";
import {login} from '../../store/auth/actions';
import AppLayout from "../../layout/AppLayout";

class HomePage extends Component{
    render() {
        const paragraphs = [
            'convenience',
            'speed',
            'advantage'
        ];

        return (
            <AppLayout>
                 <Styles>
                     <div className={'wrapper'}>
                      <div className={'text-block'}>
                            All your important files in one place
                      </div>
                     </div>
                     <div className={'description-block'}>
                         <p className={'description'}>do you want to have permanent access to your files?</p>
                         <p className={'description indent'}>then our file system is what you need</p>
                         <div className={'paragraphs-block'}>
                             {
                                 paragraphs.map((paragraph, index) => (
                                     <div className={'single-paragraph'} key={index}>
                                         {paragraph}
                                     </div>
                                 ))
                             }
                         </div>
                     </div>
                 </Styles>
            </AppLayout>
        )
    }
}

export default connect(null, { login })(HomePage);
