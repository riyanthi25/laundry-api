# Laundry API
Laundry API is a project for developing an API using **ExpressJS** and **TypeScript** language for a laundry service application. This API provides endpoints for managing customers, orders, and users.

## Problem
Laundry service businesses often face challenges in efficiently managing their operations, ranging from customer data management to order processing and user authentication. The absence of a streamlined system can lead to various issues, such as:

1.  **Inefficient Customer Management:** Without a centralized system, tracking customer information, preferences, and order history becomes challenging, leading to a less personalized customer experience.
    
2.  **Order Processing Complexity:** Manual order processing can result in errors, delays, and a lack of transparency in the order fulfillment process. This can lead to customer dissatisfaction and operational inefficiencies.
    
3.  **Security Concerns:** Handling sensitive customer information requires a secure authentication and authorization system. Without robust security measures, the business is vulnerable to data breaches and unauthorized access.
    
4.  **Lack of Scalability:** As the business grows, manual and traditional methods of managing operations become less scalable. An adaptable solution is needed to accommodate increasing data volumes and user interactions.
    
5.  **Code Maintainability:** Developing a maintainable codebase is crucial for the long-term success of the application. Without a structured approach, code becomes harder to maintain and prone to errors.

## Features
1. **Customer Management**
Efficiently manage customer data, including their personal information, addresses, phone numbers, and payment details. This feature enhances customer interaction and provides a basis for personalized services.
2. **User Authentication**
Implement a secure user authentication system to protect sensitive data and ensure that only authorized users can access and modify information. This feature helps address security concerns related to customer data.
3. **Code Maintainability**
Adopt best practices for coding to ensure a maintainable and readable codebase. This feature facilitates easier debugging, updates, and modifications to the application in the future.
 4. **Order History**
Provide a comprehensive order history for customers, allowing them to track their previous orders. This feature enhances customer satisfaction and loyalty by providing transparency and convenience.
 5. **Role-Based Access Control**
Implement role-based access control to manage user permissions effectively. This feature ensures that only authorized personnel, such as administrators, have access to certain functionalities, enhancing overall system security.
 6. **API Endpoints**
Create well-documented API endpoints for seamless integration with frontend applications or third-party services. This feature promotes interoperability and allows for the expansion of the system's functionalities.

## Installation
 1. Make sure you have installed  `npm` and	 `node js` on your device
 2. Clone this repository  with this command : `git clone https://github.com/riyanthi25/laundry-api.git`
 3. Open the project folder in your favorite code editor
 4. Open your terminal and install the dependencies with `npm install` or `npm i`, it's just the same way to installing all the dependencies
 5. Duplicate the `.env.example` file and name it `.env`. Set environment variables such as the database URL, port, and secret key according to your needs.
 6. Run seeder in `seeder.ts` file with `npx ts-node ./prisma/seeder.ts` if you have any problems when running the seeder you may install the `ts-node` with this command `npm install -g ts-node`
 7. You can run the project with `npm run dev`