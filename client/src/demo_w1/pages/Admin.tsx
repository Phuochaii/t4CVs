import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Trash2Icon, PlusIcon } from 'lucide-react';
import axios from "axios";
import Pagination from '../components/Pagination';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      const data = response.data;
      setUsers(data.data);
      setTotalPages(Math.ceil(data.total / usersPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setSnackbarMessage('Xóa người dùng thành công');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Đặt lại giá trị cho trường nhập liệu mới
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleAddUser = () => {
    // Thực hiện thêm người dùng vào danh sách
    const newUser = { id: Date.now(), first_name: newUserName, email: newUserEmail };
    setUsers([...users, newUser]);
    setSnackbarMessage('Thêm người dùng thành công');
    setSnackbarOpen(true);
    handleCloseDialog();
  };

  const goToPage = () => {
    const pageNumber = parseInt(inputPage);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    } else {
      setSnackbarMessage('Số trang không hợp lệ');
      setSnackbarOpen(true);
    }
    setInputPage('');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
      <div className="flex justify-end mb-4">
        <Button variant="contained" color="primary" onClick={handleOpenDialog} startIcon={<PlusIcon />}>
          Thêm người dùng
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Trash2Icon />}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex justify-center items-center">
          <TextField
            type="number"
            label="Trang"
            variant="outlined"
            size="small"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={goToPage}
          >
            Đi đến trang
          </Button>
        </div>
        <div className="mt-2 flex justify-center">
          <Pagination active={page} setActive={setPage} totalPages={totalPages} />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            type="text"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
}

export default AdminPage;
