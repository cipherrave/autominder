import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import FilterIcon from "./icons/FilterIcon";
import { STATUSES } from "../../../ServiceData";

import { ColorIcon } from "./StatusCell";

const StatusItem = ({ status, setColumnFilters, isActive }) => (
  <div
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    p={1.5}
    bg={isActive ? "gray.800" : "transparent"}
    _hover={{
      bg: "gray.800",
    }}
    onClick={() =>
      setColumnFilters((prev) => {
        const statuses = prev.find((filter) => filter.id === "status")?.value;
        if (!statuses) {
          return prev.concat({
            id: "status",
            value: [status.id],
          });
        }

        return prev.map((f) =>
          f.id === "status"
            ? {
                ...f,
                value: isActive
                  ? statuses.filter((s) => s !== status.id)
                  : statuses.concat(status.id),
              }
            : f
        );
      })
    }
  >
    <div color={status.color} mr={3}>
      {status.name}
    </div>
  </div>
);

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  const filterStatuses =
    columnFilters.find((f) => f.id === "status")?.value || [];

  return (
    <Popover isLazy>
      <PopoverTrigger asChild>
        <Button size="sm" color={filterStatuses.length > 0 ? "blue.300" : ""}>
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <p fontSize="md" fontWeight="bold" mb={4}>
            Filter By:
          </p>
          <p fontWeight="bold" color="gray.400" mb={1}>
            Status
          </p>
          <div align="flex-start" spacing={1}>
            {STATUSES.map((status) => (
              <StatusItem
                status={status}
                isActive={filterStatuses.includes(status.id)}
                setColumnFilters={setColumnFilters}
                key={status.id}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default FilterPopover;
