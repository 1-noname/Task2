import {
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface CategorySelectProps {
  categories: string[];
  selected: string | null;
  onChange: (value: string | null) => void;
  isLoading?: boolean;
}

export const CategorySelect = ({
  categories,
  selected,
  onChange,
  isLoading,
}: CategorySelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onChange(value === "" ? null : value);
  };

  const uiValue = selected ?? "";

  return (
    <Card
      sx={{
        background: "transparent",
        color: "var(--color-secondary)",
        padding: "var(--space-sm)",
        boxShadow: "none",
        minWidth: 200,
      }}
    >
      <Typography variant="caption" sx={{ opacity: 0.7, mb: 1 }}>
        Categories
      </Typography>

      <FormControl fullWidth disabled={isLoading}>
        <InputLabel sx={{ color: "var(--color-secondary)" }}>Select</InputLabel>

        <Select<string>
          value={uiValue}
          onChange={handleChange}
          input={<OutlinedInput label="Select" />}
          renderValue={(value) =>
            value ? (
              <Chip
                label={value}
                size="small"
                sx={{
                  background: "var(--bg-secondary-invert)",
                  color: "var(--color-secondary)",
                }}
              />
            ) : (
              <em>All categories</em>
            )
          }
        >
          <MenuItem value="">
            <em>All categories</em>
          </MenuItem>

          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Card>
  );
};
