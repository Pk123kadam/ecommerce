import React from 'react'
import "./Dashboard.css"

import { Link, Outlet } from 'react-router-dom'
import Products from '../Admin/Products'
import Users from '../Admin/Users'

function Dashboard() {
    return (
        <div>
            <div class="area"><Outlet></Outlet>

            </div><nav class="main-menu">
                <ul>
                    <li>


                        <a href="/users">
                            <i class="fa fa-user fa-2x"></i>
                            <span class="nav-text">
                                Users
                            </span>
                        </a>


                    </li>
                    <li>


                        <a href="/product">
                            <i class="fa fa-book fa-2x"></i>
                            <span class="nav-text">
                                Products
                            </span>
                        </a>


                    </li>
                    <li>


                        <a href="/order">
                            <i class="fa fa-money fa-2x"></i>
                            <span class="nav-text">
                                Orders
                            </span>
                        </a>


                    </li>

                </ul>

            </nav>

        </div>
    )
}

export default Dashboard
