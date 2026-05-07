import { createContext, useContext, useState, useCallback } from 'react';

const FleetContext = createContext();

export const FleetProvider = ({ children }) => {
  // School Data
  const [students, setStudents] = useState([
    { id: 1, studentId: 'AL-101', name: 'Pedro Gomes', class: '10A', year: '2026', status: 'Ativo', guardian: 'Marta Gomes' },
    { id: 2, studentId: 'AL-102', name: 'Sara Lima', class: '11B', year: '2026', status: 'Ativo', guardian: 'João Lima' },
    { id: 3, studentId: 'AL-103', name: 'Tiago Santos', class: '9C', year: '2026', status: 'Ativo', guardian: 'Ana Santos' },
    { id: 4, studentId: 'AL-104', name: 'Rita Fernandes', class: '12A', year: '2026', status: 'Ativo', guardian: 'Paulo Fernandes' },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Ana Costa', subject: 'Matemática', status: 'Ativo', classes: ['10A', '11B'], email: 'ana.costa@edugest.com', phone: '+244 923 123 456' },
    { id: 2, name: 'Bruno Silva', subject: 'Física', status: 'Ativo', classes: ['12A', '10B'], email: 'bruno.silva@edugest.com', phone: '+244 923 987 654' },
    { id: 3, name: 'Clara Nascimento', subject: 'Língua Portuguesa', status: 'Ativo', classes: ['9C', '11A'], email: 'clara.nascimento@edugest.com', phone: '+244 923 456 789' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Silva', email: 'alice@example.com', role: 'Admin', status: 'Ativo' },
    { id: 2, name: 'Bob Oliveira', email: 'bob@example.com', role: 'Editor', status: 'Ativo' },
    { id: 3, name: 'Carol Santos', email: 'carol@example.com', role: 'User', status: 'Inativo' },
    { id: 4, name: 'David Costa', email: 'david@example.com', role: 'User', status: 'Ativo' },
  ]);

  const [enrollments, setEnrollments] = useState([
    { id: 1, studentId: 1, course: 'Ciências', className: '10A', status: 'Confirmada', date: '02/04/2026', confirmationNote: 'Matrícula concluída com sucesso.' },
    { id: 2, studentId: 2, course: 'História', className: '11B', status: 'Confirmada', date: '03/04/2026', confirmationNote: 'Dados verificados e matrícula aprovada.' },
    { id: 3, studentId: 3, course: 'Inglês', className: '9C', status: 'Pendente', date: '05/04/2026', confirmationNote: 'Em análise pela secretaria.' },
  ]);

  const [grades, setGrades] = useState([
    { id: 1, studentId: 1, subject: 'Matemática', score: 16.5, average: 15.2, comment: 'Excelente desempenho geral.' },
    { id: 2, studentId: 2, subject: 'História', score: 14.0, average: 13.8, comment: 'Bom progresso na avaliação.' },
    { id: 3, studentId: 3, subject: 'Inglês', score: 12.5, average: 13.0, comment: 'Necessita revisão em gramática.' },
    { id: 4, studentId: 4, subject: 'Biologia', score: 17.0, average: 16.4, comment: 'Participação ativa em aula.' },
  ]);

  const [payments, setPayments] = useState([
    { id: 1, studentId: 1, amount: 75000, dueDate: '10/04/2026', status: 'Pago', method: 'Transferência' },
    { id: 2, studentId: 2, amount: 75000, dueDate: '12/04/2026', status: 'Pendente', method: 'MB Way' },
    { id: 3, studentId: 3, amount: 75000, dueDate: '08/04/2026', status: 'Pago', method: 'Multicaixa' },
  ]);

  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Segunda', time: '08:00 - 09:30', subject: 'Matemática', className: '10A', teacher: 'Ana Costa', room: 'Sala 101' },
    { id: 2, day: 'Segunda', time: '09:45 - 11:15', subject: 'História', className: '11B', teacher: 'Bruno Silva', room: 'Sala 204' },
    { id: 3, day: 'Segunda', time: '11:30 - 13:00', subject: 'Biologia', className: '12A', teacher: 'Clara Nascimento', room: 'Sala 109' },
    { id: 4, day: 'Terça', time: '08:00 - 09:30', subject: 'Inglês', className: '9C', teacher: 'Clara Nascimento', room: 'Sala 103' },
    { id: 5, day: 'Quarta', time: '10:00 - 11:30', subject: 'Física', className: '12A', teacher: 'Bruno Silva', room: 'Sala 205' },
  ]);

  // Fleet Data
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [trips, setTrips] = useState([]);

  // School Actions
  const addStudent = useCallback((student) => {
    const newStudent = { ...student, id: Math.max(...students.map((item) => item.id), 0) + 1 };
    setStudents([newStudent, ...students]);
    return newStudent;
  }, [students]);

  const updateStudent = useCallback((id, updates) => {
    setStudents(students.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, [students]);

  const deleteStudent = useCallback((id) => {
    setStudents(students.filter((item) => item.id !== id));
  }, [students]);

  const addTeacher = useCallback((teacher) => {
    const newTeacher = { ...teacher, id: Math.max(...teachers.map((item) => item.id), 0) + 1 };
    setTeachers([newTeacher, ...teachers]);
    return newTeacher;
  }, [teachers]);

  const updateTeacher = useCallback((id, updates) => {
    setTeachers(teachers.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, [teachers]);

  const deleteTeacher = useCallback((id) => {
    setTeachers(teachers.filter((item) => item.id !== id));
  }, [teachers]);

  const addUser = useCallback((user) => {
    const newUser = { ...user, id: Math.max(...users.map((item) => item.id), 0) + 1 };
    setUsers([newUser, ...users]);
    return newUser;
  }, [users]);

  const updateUser = useCallback((id, updates) => {
    setUsers(users.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, [users]);

  const deleteUser = useCallback((id) => {
    setUsers(users.filter((item) => item.id !== id));
  }, [users]);

  const addEnrollment = useCallback((enrollment) => {
    const newEnrollment = { ...enrollment, id: Math.max(...enrollments.map((item) => item.id), 0) + 1 };
    setEnrollments([newEnrollment, ...enrollments]);
    return newEnrollment;
  }, [enrollments]);

  const updateEnrollment = useCallback((id, updates) => {
    setEnrollments(enrollments.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, [enrollments]);

  const deleteEnrollment = useCallback((id) => {
    setEnrollments(enrollments.filter((item) => item.id !== id));
  }, [enrollments]);

  const addPayment = useCallback((payment) => {
    const newPayment = { ...payment, id: Math.max(...payments.map((item) => item.id), 0) + 1 };
    setPayments([newPayment, ...payments]);
    return newPayment;
  }, [payments]);

  const updatePayment = useCallback((id, updates) => {
    setPayments(payments.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, [payments]);

  const deletePayment = useCallback((id) => {
    setPayments(payments.filter((item) => item.id !== id));
  }, [payments]);

  // Fleet Actions
  const addVehicle = useCallback((vehicle) => {
    const newVehicle = { ...vehicle, id: Math.max(...vehicles.map((item) => item.id), 0) + 1 };
    setVehicles([newVehicle, ...vehicles]);
    return newVehicle;
  }, [vehicles]);

  const updateVehicle = useCallback((id, updates) => {
    setVehicles(vehicles.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, [vehicles]);

  const deleteVehicle = useCallback((id) => {
    setVehicles(vehicles.filter((item) => item.id !== id));
  }, [vehicles]);

  const addDriver = useCallback((driver) => {
    const newDriver = { ...driver, id: Math.max(...drivers.map((item) => item.id), 0) + 1 };
    setDrivers([newDriver, ...drivers]);
    return newDriver;
  }, [drivers]);

  const updateDriver = useCallback((id, updates) => {
    setDrivers(drivers.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, [drivers]);

  const deleteDriver = useCallback((id) => {
    setDrivers(drivers.filter((item) => item.id !== id));
  }, [drivers]);

  const addMaintenance = useCallback((maintenance) => {
    const newMaintenance = { ...maintenance, id: Math.max(...maintenances.map((item) => item.id), 0) + 1 };
    setMaintenances([newMaintenance, ...maintenances]);
    return newMaintenance;
  }, [maintenances]);

  const updateMaintenance = useCallback((id, updates) => {
    setMaintenances(maintenances.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, [maintenances]);

  const deleteMaintenance = useCallback((id) => {
    setMaintenances(maintenances.filter((item) => item.id !== id));
  }, [maintenances]);

  const addTrip = useCallback((trip) => {
    const newTrip = { ...trip, id: Math.max(...trips.map((item) => item.id), 0) + 1 };
    setTrips([newTrip, ...trips]);
    return newTrip;
  }, [trips]);

  const deleteTrip = useCallback((id) => {
    setTrips(trips.filter((item) => item.id !== id));
  }, [trips]);

  return (
    <FleetContext.Provider
      value={{
        students,
        teachers,
        users,
        enrollments,
        grades,
        payments,
        schedule,
        vehicles,
        drivers,
        maintenances,
        trips,
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addEnrollment,
        updateEnrollment,
        deleteEnrollment,
        addPayment,
        updatePayment,
        deletePayment,
        addUser,
        updateUser,
        deleteUser,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addDriver,
        updateDriver,
        deleteDriver,
        addMaintenance,
        updateMaintenance,
        deleteMaintenance,
        addTrip,
        deleteTrip,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => useContext(FleetContext);
