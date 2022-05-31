import React from "react"
import { useNavigate } from "react-router-dom"
import "./Navigation.scss"

function Navigation(props) {
    let navigate = useNavigate()

    return (
        <div className="navigation">
            <div className="navigation__container">
                <div
                    className="btn navigation__goback"
                    onClick={() => navigate(-1)}
                >
                    <img src="/assets/icons/back.svg" alt="" />
                </div>
                <div className="navigation__header">
                    <p>{props.header}</p>
                </div>
            </div>
        </div>
    )
}

export default Navigation
