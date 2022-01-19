import React from 'react'
import fib from "../../assets/fib.png"
import upc from "../../assets/upc.png"

class Contact extends React.Component {

    render() {

        return (
            <div>
                <p>HEADER</p>
                <p>HEADER</p>
                <div>
                    <h1 className="title">Contact Us</h1>
                </div>
                <div className="user-box">
                    <div className="info">
                        <h2>Information: </h2>
                        <h3>
                            Hi, my name is Alex Gallego and this webpage is my Final Degree Project of
                        Computer Science Degree in the Polytechnic University of Catalonia, specializing in
                        Software Engineering. This application aims to provide an useful tool for massive analysis
                            of Twitter hashtags and keywords and their respective sentiment.<br/><br/>

                            By continue to use this webpage, you agree to the terms and conditions of it.
                        Twitter is an unregulated social network and this application is not responsible of the
                        contents extracted from it. Also, no personal data, except of the provided, will be extracted
                        from the use.<br/><br/>

                            For more information or any enquiries, please contact the following email:&nbsp;
                            <a
                                href='mailto:contact@hashtaganalysis.com'
                            >
                                 contact@hashtaganalysis.com
                            </a>
                        </h3>
                        <hr style={{width: 1000}}/>
                        <img src={upc} alt="upc"/>
                        <img src={fib} alt="fib"/>

                    </div>
                </div>

            </div>
        )
    }
}

export default Contact