export class ApplicantWorkExperienceModel {
  id: number = 0;
  applicant_id: number = 0;
  date_start: any;
  date_end: any;
  organization_name: string = '';
  position: string = '';
  address: string = '';
  number_of_hours: number = 0;
  monthly_salary: number = 0;
  salary_increase: number = 0;
  status_of_appointment: string = '';
  is_governement_service: boolean = false;
  is_voluntary: boolean = false;
}
