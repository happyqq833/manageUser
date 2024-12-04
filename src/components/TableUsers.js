
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/userServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './modalAddNew';
import ModalEditUser from './modalEditUser';
import ModalDeleteUser from './modalDeleteUser';
import _, { debounce } from 'lodash';
import "./TableUser.scss";
import { CSVDownload, CSVLink } from 'react-csv';
import Papa from "papaparse";
import { toast } from 'react-toastify';
const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField ] = useState("id");

    const [keyword, setKeyword] = useState("");
    const [dataExport, setDataExport] = useState([]);
    useEffect(() => {
       getAllUser(1);
    }, [])
    

    const handleClose = () => {
      setIsShowModalAddNew(false);
      setIsShowModalEdit(false);
      setIsShowModalDelete(false);
    };

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser])
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };
    const handleDeleteUser = (user) => {
        setDataUserDelete(user);
        setIsShowModalDelete(true);
    }

    const getAllUser = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data ){
            setTotalUser(res.total)
            setListUser(res.data);
            setTotalPages(res.total_pages)
        }
    };

    const handlePageClick = (event) => {
        getAllUser(+event.selected + 1)
      };

    const handleEditUserFormModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        let index = listUser.findIndex(item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        setListUser(cloneListUser);
    }
    const handleDeleteUserFormModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = cloneListUser.filter(item => item.id !== user.id);
        setListUser(cloneListUser);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy); 
        setSortField(sortField);

        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    }

    const handleSearch = debounce( (event) => {
        let term = event.target.value;
        if(term){
            let cloneListUser = _.cloneDeep(listUser);
            cloneListUser = cloneListUser.filter(item => item.email.includes(term));
            setListUser(cloneListUser);
        } else{
            getAllUser();
        }
    }, 500);
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
      ];

    const getUserExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0){
            result.push(["id", "Email", "First name", "Last name"]);
            listUser.map((item, index)=> {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name; 
                result.push(arr);
            })

            setDataExport(result);
            done();
        }
    }

    const handleImportCSV = (event) => {
        // console.log(event);
        if (event.target && event.target.files && event.target.files[0]){
            let file = event.target.files[0];
            console.log(file)
            if(file.type !== "text/csv"){
                toast.error("Only accept csv file!");
                return;
            }
            Papa.parse(file, {
                // header: true,
                complete: function(results){
                    let rawCSV = results.data;
                    if(rawCSV.length > 0){
                        if(rawCSV[0] && rawCSV[0].length === 3){
                            if(rawCSV[0][0] !== "email" 
                                || rawCSV[0][1] !== "first_name" 
                                || rawCSV[0][2] !== "last_name"){
                                 toast.error("Wrong format CSV file!")
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if(index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                })
                                setListUser(result);
                            }
                        } else{
                             toast.error("Wrong format CSV file!")
                        }
                    } else{
                        toast.error("Not found data on CSV file!")
                    }
                }
            })
        }
        
       
    }
    return (
        <>
        <div className='my-3 add-new d-sm-flex'> 
              <span ><h3>List User</h3></span>
              <div className='group-btns mt-sm-0 mt-2'>
                <label className='btn btn-warning' htmlFor="test"><i className='fa-solid fa-file-import'></i> Import</label>
                <input id="test" type='file' hidden
                onChange={(event) => handleImportCSV(event)} />
               
                <CSVLink 
                filename='user.csv'
                data={dataExport}
                asyncOnClick={true}
                onClick={getUserExport}
                className='btn btn-primary'
                ><i className='fa-solid fa-file-arrow-down'></i> Export</CSVLink>
               
              
              <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>
              <i className='fa-solid fa-circle-plus'></i> Add new</button>
              </div>
            </div>
        <div className='col-12 col-sm-4 my-3'>
            <input className='form-control' placeholder='Search by email' onChange={(event) => {handleSearch(event)}}/>
        </div>
         <div className='customize-table'>
            <Table col- striped bordered hover >
            <thead>
                <tr>
                <th>
                    <div className='sort-header'>
                        <span>ID</span>
                        <span>
                            <i className='fa-solid fa-arrow-down-long'
                            onClick={() => handleSort("desc", "id")}></i>
                            <i className='fa-solid fa-arrow-up-long'
                            onClick={() => handleSort("asc", "id")}></i>
                        </span>
                    </div>                   
                </th>
                <th>
                <div className='sort-header'>
                        <span>First name</span>
                        <span>
                            <i className='fa-solid fa-arrow-down-long' onClick={()=> handleSort("desc", "first_name")}></i>
                            <i className='fa-solid fa-arrow-up-long' onClick={()=> handleSort("asc", "first_name")}></i>
                        </span>
                    </div>
                </th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length > 0 &&
                
                listUser.map((item, index) => {
                    return(
                        <tr key={`user-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>
                                <button 
                                    className='btn btn-warning mx-2' 
                                    onClick={() => handleEditUser(item)}>Edit</button>
                                <button className='btn btn-danger mx-2'
                                    onClick={() => handleDeleteUser(item)}>Del</button>
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </Table></div>
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
        />
        <ModalAddNew
          show = {isShowModalAddNew}
          handleClose = {handleClose}
          handleUpdateTable = {handleUpdateTable}
        />
        <ModalEditUser
            show = {isShowModalEdit}
            handleClose = {handleClose}
            dataUserEdit = {dataUserEdit}
            handleEditUserFormModal = {handleEditUserFormModal}
        />
        <ModalDeleteUser
            show = {isShowModalDelete}
            handleClose = {handleClose}
            dataUserDelete = {dataUserDelete}
            handleDeleteUserFormModal = {handleDeleteUserFormModal}
        />
        </>
    )
}

export default TableUsers ;