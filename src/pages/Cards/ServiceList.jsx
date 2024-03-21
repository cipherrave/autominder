import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "../../reducers/reducer";
import { FETCH_ACTIONS } from "../../actions";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ServiceList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const { items, loading, error } = state;

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });

    const getItems = async () => {
      try {
        let response = await axios.get(
          "http://localhost:8989/user/service/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          dispatch({ type: FETCH_ACTIONS.SUCCESS, data: response.data });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      }
    };

    getItems();
  }, []);

  return (
    <div className="flex flex-wrap flex-grow overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Service ID</TableHead>
            <TableHead>Service Name</TableHead>
            <TableHead>Service Date</TableHead>
            <TableHead>Next Mileage</TableHead>
            <TableHead>Next Service Date</TableHead>
            <TableHead>Cost (RM)</TableHead>
            <TableHead>Vehicle ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.service_id}>
              <TableCell className="font-medium">{item.service_id}</TableCell>
              <TableCell>{item.service_name}</TableCell>
              <TableCell>{item.service_date}</TableCell>
              <TableCell>{item.next_mileage}</TableCell>
              <TableCell>{item.next_date}</TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>{item.vehicle_id}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="text" className="self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Service</DropdownMenuItem>
                    <DropdownMenuItem>View Vehicle</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceList;
