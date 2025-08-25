# MediContact

## Objective 
Provide healthcare clients with a means to swiftly book appointments with 
medical professionals and retrieve health records.

## Project Scope
This project aims to offer the best quality medical booking services giving more visibility and information to medical professionals. In order to gain the trust of casual users, this system must contain a highly secure server that will be able to reliably handle a large volume of requests. It will be accessible to both clients and doctors for establishing a two-way booking process:

* Client submits request => Doctor confirms request => Client receives confirmation
* Clients are given free access to services and are protected by token-based authentication.

## Main Features
1.  Patient submits a check-in form before scheduling an appointment.
2.  Booking an appointment using interactive calendar interface.
3.  Canceling an appointment.
4.  Submitting or exchanging clinical records.
5.  Receiving alerts or notifications about upcoming appointments.

## Technology Stack
* Web hosting and database management: Google Cloud Firebase, Firestore
* Frameworks: Next.Js, React
* Frontend: HTML, CSS, Tailwind CSS
* Server-side Development: JavaScript, NodeJs, Google Cloud SDK, Firebase SDK

## Screenshots
<img width="1196" height="681" alt="Screenshot (445)" src="https://github.com/user-attachments/assets/8b4b6464-f854-4f31-badb-4db91e83f14f" />
-This is the public facing webpage that each user sees when they access the website.
<br>
<br>
<br>
<br>
<img width="1197" height="675" alt="Screenshot (446)" src="https://github.com/user-attachments/assets/bd742a03-16e4-4426-919e-bf7ce3575935" />
-If the user already has an account, they can sign in. If not, they can create a new account.
<br>
<br>
<br>
<br>
<img width="1194" height="679" alt="Screenshot (447)" src="https://github.com/user-attachments/assets/91e501b8-4f46-42e0-8adf-599a1f3b7807" />
-The newly created user can be either a patient or a doctor. The web server's authentication system will know automatically which role the user is when they sign in.
<br>
<br>
<br>
<br>
<img width="1196" height="643" alt="Screenshot (442)" src="https://github.com/user-attachments/assets/fc782577-c38b-45a4-b9c9-069c6ff2c06d" />
-If the user wants to book an appointment, they must first fill out a virtual check-in form.
<br>
<br>
<br>
<br>
<img width="1199" height="627" alt="Screenshot (443)" src="https://github.com/user-attachments/assets/09144613-4d49-49f0-b317-5a9493de6fda" />
-Once the user is done filling out the form, they must select their availability date on the calendar to reserve a spot for an appointment.
<br>
<br>
<br>
<br>
<img width="1200" height="625" alt="Screenshot (444)" src="https://github.com/user-attachments/assets/8c794925-4cc0-4296-ac48-3984880b370a" />
-After a user reserves a date, this information will be transferred from the patient side to the selected doctor's side. The doctor will see each scheduled appointment in chronological order and can choose to either approve or decline the patient's request based on the given details.



