import React from 'react'
import {Section,Link} from "admin-bro"
const Image = (props) => {
    return(
    <Section>
      <h4>
        Фото пасспорта
  {!props.record.params["passportPhoto.path"]&&": Отсутствует"}
      </h4>
      
      {props.record.params["passportPhoto.path"]&&
      <Link href={props.record.params["passportPhoto.path"]} target="_blank">
        <img style={{
          width:"100%"
        }} src={props.record.params["passportPhoto.path"]} alt=""/>
      </Link>
      }
    </Section>
)}

export default Image