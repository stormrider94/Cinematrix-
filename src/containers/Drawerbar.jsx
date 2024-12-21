import styled from "styled-components"
import {Button, Drawer, List, Tree} from "antd"
import { useState } from "react"
import {
    MenuOutlined,
    CloseCircleFilled,
} from "@ant-design/icons"
import colors from "../utils/colors"
import { navLinks } from "../utils/data"
import {Link} from "react-router-dom"


const Drawerbar = () => {
    const [visible, setVisible] = useState(false)
    const [showChildren, setShowChildren] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
    }
    
    const renderNavLinks = () => (
        <LinksWrapper>
            <List>{
                navLinks.map((nl,i)=> (
                    <Link to={nl.link} onClick = {onClose}>
                        <List.Item key={i} style={{border : "none"}}>
                            <Button className="btn" type="text" block icon= {nl.icon}>
                                {nl.title}
                            </Button>
                        </List.Item>
                    </Link>
                ))}
            </List>
        </LinksWrapper>
    )

    return (
        <div>
            <Button type="text" icon={<MenuOutlined style={{ color: "white" }}/>} onClick={showDrawer}/>
<Drawer
      width={250}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80px",
            position: "relative",
          }}
        >
          <Link to="/">
            <img
              src="/assets/images/cinematrix_logo_5.svg"
              alt=""
              width={80}
              height={20}
            />
          </Link>
          <Button
            type="text"
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            icon={<CloseCircleFilled />}
          />
        </div>
      }
      closable={false}
      placement="left"
      onClose={onClose}
      open={visible}
      // Remove deprecated headerStyle and bodyStyle, apply styles directly
      style={{
        header: {
          borderBottom: "none",
          padding: "0px",
          background: `${colors.black}`,
          height: "200px",
        },
        body: {
          margin: 0,
          paddingTop: 10,
          paddingLeft: 5,
          paddingRight: 5,
          width: "100%",
        },
      }}
    >
        {renderNavLinks()}
      </Drawer>

        </div>
    )
}

const LinksWrapper = styled.div`
.btn {
display : flex;
flex-direction : row;
align-items : center;
justify-content : flex-start;
position : relative;
}`

export default Drawerbar;