import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../context/context"
import { SearchOutlined } from "@ant-design/icons"
import styled from "styled-components"
import colors from "../utils/colors"
import { Input, message } from "antd"




const Searchbar = () => {
    const navigate = useNavigate()
    const {searchTerm, setSearchTerm, searchMovies } = useContext(GlobalContext)

    const handleSearch = () => {
        if(searchTerm.length > 2) {
            searchMovies(null, searchTerm)
        } else {
            message.info("Search term should be more th")
        }
    }
    
    return (
        <SearchbarWrapper>
            <Input
            required
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => navigate("/search")}
            placeholder="Search cinematrix"
            suffix={
                <SearchOutlined 
                style={{ color : '#000', cursor : "pointer"}}
                onClick={handleSearch}/>
            }
            style={{
                borderRadius : '3px',
                background : `${colors.white}`,
                width : "100%",
                paddingLeft : "15px",
                paddingRight : "15px"
            }}/>
        </SearchbarWrapper>
    )
}

const SearchbarWrapper = styled.div`
width : 100%;
display : flex;
flex-direction : row;
align-items : center;

input {
color : #000;
&::placeholder {
color : rgba (0,0,0,0.3)}}`

export default Searchbar