import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import './ProfilePage.css'


export default function ProfilePage() {

    const getDaysDivs = (days) => Array.from({ length: days }, (_, i) => (
        <div key={i} className="user_info_day"></div>
    ));
    
    const getLastFourMonthsData = () => {
        const today = new Date();
        let result = [];
    
        for (let i = 0; i < 4; i++) {
            const year = today.getFullYear();
            const month = today.getMonth() - i; // Adjust for past months
            const date = new Date(year, month + 1, 0); // Last day of the month
            const monthName = date.toLocaleString('default', { month: 'long' }); // Get full month name
    
            result.push({
                name: monthName,
                daysDivs: getDaysDivs(date.getDate()), // Now it returns JSX elements
            });
        }
    
        return result;
    };
    
    // Assigning variables
    const [month1, month2, month3, month4] = getLastFourMonthsData();
    
    

    const progress = {
        dailyProgress: 80,
        weeklyProgress: 50,
        monthlyProgress: 65,
    }
    let dayProgress, weekProgress, monthProgress;
    function setProgress(percent, type) {
        if (percent < 60) {
            return (
                <>
                    <p>{ type } - <span className="text-danger">{percent}%</span></p>
                    <div className="progress mb-2">      
                        <div className="progress-bar" style={{width: `${percent}%`}}></div>
                    </div>
                </>
            )
        }
        else if (percent < 80) {
            return (
                <>
                    <p>{ type } - <span className="text-warning">{percent}%</span></p>
                    <div className="progress mb-2">
                        <div className="progress-bar" style={{width: `${percent}%`}}></div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <p>{ type } - <span className="text-success">{percent}%</span></p>
                    <div className="progress mb-2">
                        <div className="progress-bar" style={{width: `${percent}%`}}></div>
                    </div>
                </>
            )
        }
    }
    dayProgress = setProgress(progress.dailyProgress, 'Daily');
    weekProgress = setProgress(progress.weeklyProgress, 'Weekly');
    monthProgress = setProgress(progress.monthlyProgress, 'Monthly');

  return (
    <div className="container d-flex justify-content-center home_page_container" style={{ flexDirection: "column" }}>
        <DashboardSidebar />

        <div className="profile-card text-center p-4" style={{width: 'calc(100vw - 250px)', position: 'fixed', right: '0', top: '0', overflowY: 'scroll', height: '100vh'}}>
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="profile-pic mb-3" />
            <h3 className="text-primary">John Doe</h3>
            <p className="text-muted">Full Stack Developer | Tech Enthusiast</p>

            <hr />

            <div className="text-start user_info_parent dff">
                <div className="container_left user_info_container">
                    <p><strong>Email:</strong> johndoe@example.com</p>
                    <p><strong>Phone:</strong> +1 234 567 890</p>
                    <p><strong>Address:</strong> 123 Main St, New York, USA</p>
                </div>
                <div className="container_right user_info_container df-ai">
                <div className="user_info_month_container dff">
                    <div className="user_info_month user_info_month1 df">
                        { month4.daysDivs }
                    </div>
                    <div className="user_info_month_name dff">{ month4.name }</div>
                </div>

                <div className="user_info_month_container dff">
                    <div className="user_info_month user_info_month2 df">
                        { month3.daysDivs }
                    </div>
                    <div className="user_info_month_name dff">{ month3.name }</div>
                </div>

                <div className="user_info_month_container dff">
                    <div className="user_info_month user_info_month3 df">
                        { month2.daysDivs }
                    </div>
                    <div className="user_info_month_name dff">{ month2.name }</div>
                </div>

                <div className="user_info_month_container dff">
                    <div className="user_info_month user_info_month4 df">
                        { month1.daysDivs }
                    </div>
                    <div className="user_info_month_name dff">{ month1.name }</div>
                </div>

                </div>
            </div>

            <hr />

            <h5 className="text-primary">Progress</h5>
            { dayProgress }
            { weekProgress }
            { monthProgress }

            <hr />

            <div className="social-icons d-flex justify-content-center">
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            </div>
        </div>
    </div>
  );
}
