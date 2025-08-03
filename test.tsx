<div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex justify-center items-center bg-neutral-100 rounded-l-md ">
              <CalendarIcon className="size-4" />
            </div>
            <Popover>
              <PopoverTrigger className="w-full" asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !watch("invoice_date") && "text-muted-foreground",
                    "justify-start font-normal rounded-l-none flex-1 w-full "
                  )}
                  disabled={isLoading}
                >
                  {watch("invoice_date") ? (
                    format(watch("invoice_date"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={watch("invoice_date")}
                  onSelect={(date) => {
                    setValue("invoice_date", date as Date, {
                      shouldValidate: true,
                    });
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors?.invoice_date && (
            <p className="text-xs text-red-500">
              {errors.invoice_date.message}
            </p>
          )}
        </div>