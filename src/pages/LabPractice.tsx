import React from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";


const LabPractice: React.FC = () => {
    const labs = [
        { id: 1.1, title: "HTML Cơ bản và Cấu trúc", path: "LabTH_NMWUD/Lab01/Lab01/Vi_du/index.html" },
        { id: 1.2, title: "HTML Cơ bản và Cấu trúc", path: "LabTH_NMWUD/Lab01/Lab01/Vi_du/index01.html" },
        { id: 2.1, title: "Forms và Input Elements", path: "LabTH_NMWUD/Lab02/Lab02/lab2_1.html" },
        { id: 2.2, title: "Forms và Input Elements", path: "LabTH_NMWUD/Lab02/Lab02/lab2_2.html" },
        { id: 2.3, title: "Forms và Input Elements", path: "LabTH_NMWUD/Lab02/Lab02/Vi_du_Lab01/lab2_3.html" },
        { id: 3.1, title: "CSS Styling và Layout", path: "LabTH_NMWUD/Lab03/Lab03/Vi_du/lab3_1.html" },
        { id: 3.2, title: "CSS Styling và Layout", path: "LabTH_NMWUD/Lab03/Lab03/Vi_du_Lab01/lab3_2.html" },
        { id: 3.2, title: "CSS Styling và Layout", path: "LabTH_NMWUD/Lab03/Lab03/Vi_du_Lab01/lab3_3.html" },
        { id: 4.1, title: "Responsive Design", path: "LabTH_NMWUD/Lab04/Lab04/Vi_du/lab4_1.html" },
        { id: 4.2, title: "Responsive Design", path: "LabTH_NMWUD/Lab04/Lab04/Vi_du/lab4_2.html" },
        { id: 4.3, title: "Responsive Design", path: "LabTH_NMWUD/Lab04/Lab04/Vi_du/lab4_3.html" },
        { id: 5.1, title: "JavaScript DOM Manipulation", path: "LabTH_NMWUD/Lab05/lab5_1.html" },
        { id: 5.2, title: "JavaScript DOM Manipulation", path: "LabTH_NMWUD/Lab05/Bai_2/lab5_2.html" },
        { id: 5.3, title: "JavaScript DOM Manipulation", path: "LabTH_NMWUD/Lab05/Vi_du/lab5_3.html" },
        { id: 6.1, title: "Event Handling", path: "LabTH_NMWUD/Lab06/layout/lab6_1.html" },
        { id: 6.2, title: "Event Handling", path: "LabTH_NMWUD/Lab06/layout/lab6_2.html" },
        { id: 6.3, title: "Event Handling", path: "LabTH_NMWUD/Lab06/layout/lab6_3.html" },
        { id: 7.1, title: "AJAX và Fetch API", path: "LabTH_NMWUD/Lab07.demo/lab7_1.html" },
        { id: 7.2, title: "AJAX và Fetch API", path: "LabTH_NMWUD/Lab07/Vi_du/lab7_2.html" },
        { id: 8.1, title: "Local Storage và Session Storage", path: "LabTH_NMWUD/Lab08/lab8_1.html" },
        { id: 8.2, title: "Local Storage và Session Storage", path: "LabTH_NMWUD/Lab08/lab8_2.html" },
        { id: 8.3, title: "Local Storage và Session Storage", path: "LabTH_NMWUD/Lab08/lab8_3.html" },

    ];    const handleLabClick = (path: string) => {
        // Sử dụng đường dẫn tương đối từ thư mục public
        const fullPath = `${process.env.PUBLIC_URL || ''}/${path}`;
        // Tạo một thẻ a tạm thời để mở link
        const link = document.createElement('a');
        link.href = fullPath;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Container className="lab-practice-container mt-5">
            <div className="lab-grid">
                {labs.map((lab) => (
                    <Card key={lab.id} className="lab-card">
                        <Card.Body>
                            <Card.Title>Lab {lab.id}</Card.Title>
                            <Card.Text>{lab.title}</Card.Text>
                            <Button 
                                variant="primary" 
                                onClick={() => handleLabClick(lab.path)}
                            >
                                Go to Lab {lab.id}
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default LabPractice;