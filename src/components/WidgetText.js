import React from "react";

const WidgetText = (props) =>{
    return(
        <div className="widget_wrapper">
            <div className="widget_title">{props.title}</div>
            <div className="widget_content">
                <div className="widget_head">{props.value}</div>
                <div className="widget_desc">{props.content}</div>
            </div>
         
        </div>
    )
}

export default WidgetText