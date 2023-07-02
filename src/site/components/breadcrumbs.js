import React from "react"
import { Link } from "@gatsbyjs/reach-router"

export const breadCrumbRender=(route, params, items, paths)=>{
    const last = items.indexOf(item) === items.length - 1;
    return last ? <span>{item.title}</span> : <Link to={paths.join('/')}>{item.title}</Link>;
  }