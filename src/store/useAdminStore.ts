import { Admin, DtoNewAdmin } from "@/@core/types";

export const useAdminStore = defineStore('admin', () => {

  const adminsList = ref<Admin[]>()
  // const pendingStudents = ref<Student[]>()
  const currentAdmin = ref<Admin>()
  const loading = ref(true)
  const error = ref('')

  //👉 - Get All Admins
  async function getAllAdmins(currentPage?: Number, itemsPerPage?: Number, programId?: string, departmentName?: string, code?: string, lastName?: string, firstName?: string) {

    const { data, error: hasError, isFetching } = await useApi(createUrl('/user/admin', {
      query: {
        page: (currentPage - 1),
        size: itemsPerPage,
        programID: programId,
        departmentName: departmentName,
        code: code,
        lastName: lastName,
        firstName: firstName
      }
    })
    )
    adminsList.value = data.value as Admin[]
    loading.value = isFetching.value
    error.value = hasError.value
  }


  //👉 - Add Admin 
  async function addOne(newStudent: DtoNewAdmin) {
    return await useApi('/user/admin/new').post(newStudent)
  }


  return {
    adminsList, getAllAdmins, addOne
  }
  // //👉 - Update Student
  // async function updateOne(newStudent: DtoNewStudent) {
  //   return await useApi('/user/student/update').put(newStudent)
  // }

  // //👉 - Find all students by program
  // async function getStudentsByProgram(program: PROGRAM) {
  //   try {
  //     const { data, error: hasError, isFetching } = await useApi(`/user/student/program/${program}`)
  //     studentsList.value = data.value as Student[]
  //     loading.value = isFetching.value
  //     error.value = hasError.value
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // //👉 - Find student by his code
  // async function getStudentByCode(code: string) {
  //   try {
  //     const { data, error: hasError, isFetching } = await useApi(`/user/student/code/${code}`)
  //     currentStudent.value = data.value as Student
  //     loading.value = isFetching.value
  //     error.value = hasError.value
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // //👉 - Get student by his email
  // async function getStudentByEmail(email: string) {
  //   try {
  //     const { data, error: hasError, isFetching } = await useApi(`/user/student/email/${email}`)
  //     currentStudent.value = data.value as Student
  //     loading.value = isFetching.value
  //     error.value = hasError.value
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // //👉 - Delete student by his Email
  // async function deleteUserByEmail(email: string) {
  //   return await useApi(`/user/delete?email=${email}`).delete()
  // }

  // //👉 - Ban student registration
  // async function banStudentRegistration(email: string) {
  //   return await useApi(`/user/ban`).post(email)
  // }

  // //👉 - Approvig student registration
  // async function approvingStudentRegistration(email: string) {
  //   return await useApi(`/user/approve`).post(email)
  // }

  // //👉 - Decline student registration
  // async function declineStudentRegistration(email: string) {
  //   return await useApi(`/user/approve`).post(email)
  // }

  // //👉 - Get List student pending
  // async function getPendingStudents(currentPage?: Number, itemsPerPage?: Number, email?: String) {
  //   try {
  //     const { data, error: hasError, isFetching } = await useApi(createUrl('/user/pending-students', {
  //       query: {
  //         page: (currentPage - 1),
  //         size: itemsPerPage,
  //         email: email
  //         // programID: programId,
  //         // code: code,
  //         // lastName: lastName,
  //         // firstName: firstName
  //       }
  //     })
  //     )
  //     pendingStudents.value = data.value as Student[]
  //     loading.value = isFetching.value

  //     error.value = hasError.value
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  // //👉 - Get List student pending by email
  // async function getPendingStudentsByEmail(email: string) {
  //   return await useApi(`/user/pending-student/${email}`).get();
  // }

  // //👉 - Load Students From Excel
  // async function uploadStudentFile(file: File) {
  //   console.log(file);

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/students/load-from-excel`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${useCookie('accessToken').value}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     return res.data;

  //   } catch (error) {
  //     console.error('Error uploading file:');

  //     if (error.response && error.response.data) {
  //       console.log(error);
  //       console.warn(error.response);

  //       const errorMessage = error.response.data.message
  //       if (!errorMessage)
  //         throw error.response.data
  //       else
  //         throw errorMessage
  //     } else {
  //       console.error('Error message:', error.message);
  //     }
  //   }
  // }

  // //👉 - Toggle Account 
  // async function toggleEnableUserAccount(email: string) {
  //   return await useApi('/user/toggle-account-status?email=' + email).patch()
  // }

  // //👉 - Approve multiple users
  // async function approveMultipleUsers(listEmails: string[]) {
  //   return await $api(`/user/pending-students/approve-selection`, {
  //     method: 'POST',
  //     body: listEmails,
  //   })
  // }

  // //👉 - Decline multiple users
  // async function declineMultipleUsers(listEmails: string[]) {
  //   return await $api(`/user/pending-students/decline-selection`, {
  //     method: 'POST',
  //     body: listEmails,
  //   })
  // }

  // //👉 - Ban multiple users
  // async function banMultipleUsers(listEmails: string[]) {
  //   return await $api(`/user/pending-students/ban-selection`, {
  //     method: 'POST',
  //     body: listEmails,
  //   })
  // }

  // //👉 - Reset pw multiple students
  // async function resetPasswordToMultipleStudents(listEmails: string[]) {
  //   return await $api(`/user/multiple/reset-pw`, {
  //     method: 'PUT',
  //     body: listEmails,
  //   })
  // }

  // //👉 - Toggle multiple students
  // async function toggleMultipleStudents(listEmails: string[]) {
  //   return await $api(`/user/toggle-selection`, {
  //     method: 'PATCH',
  //     body: listEmails,
  //   })
  // }

  // //👉 - Delete multiple students
  // async function deleteMultipleStudents(listEmails: String[]) {
  //   console.log(listEmails);

  //   return await $api(`/user/delete-selection`, {
  //     method: 'DELETE',
  //     body: listEmails,
  //   })

  // }


  // return {
  //   studentsList, currentStudent, loading, error, pendingStudents, updateOne, approvingStudentRegistration, banStudentRegistration, declineStudentRegistration, getPendingStudents, deleteUserByEmail, getAllStudents, addOne, getStudentByCode, getStudentsByProgram, getStudentByEmail, toggleEnableUserAccount, getPendingStudentsByEmail, uploadStudentFile, approveMultipleUsers,
  //   declineMultipleUsers,
  //   banMultipleUsers,
  //   resetPasswordToMultipleStudents,
  //   deleteMultipleStudents, toggleMultipleStudents
  // }
})