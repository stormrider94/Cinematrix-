import {
    FaFilm,
    FaLayerGroup,
    FaList,
    FaSignInAlt,
    FaStackpath,
    FaStar,
    FaTv,
    FaUser,
    FaUserAlt,
} from "react-icons/fa"

export const navLinks = [
    {
        title : "Movies",
        link: "/movies",
        icon : <FaFilm style={{ marginRight : "20px"}}/>,
    },
    {
        title: "Series",
        link: "/series",
        icon : <FaLayerGroup style={{marginRight : "20px"}}/>,
    },
    { title : "About",
      link : "/about",
      icon : <FaUser style={{marginRight : "20px"}}/>
    }
]