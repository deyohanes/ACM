import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import  SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <> 
      {userInfo ? (
        <>
          <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>Agriculture Commodity Market </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Route
                    render={({ history }) => <SearchBox history={history} />}
                  />

                  <Nav className="ml-auto">
                    {userInfo.isAdmin || userInfo.role === "producer" ? (
                      <></>
                    ) : (
                      <>
                        <LinkContainer to="/cart">
                          <Nav.Link>
                            <i className="fas fa-shopping-cart"></i> Cart
                          </Nav.Link>
                        </LinkContainer>
                      </>
                    )}

                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id="username">
                        {userInfo.role == "producer" ? (
                          <>
                            <LinkContainer to={`/profile/${userInfo._id}`}>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/producerproducts">
                              <NavDropdown.Item>Own Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to={`/sold/${userInfo._id}`}>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>
                          </>
                        ) : (
                          <>
                            {userInfo.role == "admin" ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                <LinkContainer to={`/profile/${userInfo._id}`}>
                               
                                  <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                              </>
                            )}

                            {userInfo.role == "member" ? (
                              <>
                               
                              </>
                            ) : (
                              <>
                                {" "}
                                <LinkContainer to="/admin/orderlist">
                                  <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                              </>
                            )}
                          </>
                        )}
                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <LinkContainer to="/login">
                        <Nav.Link>
                          <i className="fas fa-user"></i> Sign In
                        </Nav.Link>
                      </LinkContainer>
                    )}
                    {userInfo &&  userInfo.isAdmin  &&(
                      <NavDropdown title="Admin" id="adminmenu">
                        <LinkContainer to="/admin/userlist">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>

                        {userInfo.role === "admin" ? (
                          <>
                            <LinkContainer to="/admin/commodity">
                              <NavDropdown.Item>services</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/warehouse">
                              <NavDropdown.Item>warehouses</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/bids">
                              <NavDropdown.Item>Verify Post</NavDropdown.Item>
                            </LinkContainer>
                          </>
                        ) : (
                          <>
                            <LinkContainer to="/admin/productlist">
                              <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/orderlist">
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}
                      </NavDropdown>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
        </>
      ) : (
        <>
          <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>Agriculture Commodity Market </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Route
                    render={({ history }) => <SearchBox history={history} />}
                  />
                  <Nav className="ml-auto">
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fa-regular fa-message"></i>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fas fa-user"></i> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
