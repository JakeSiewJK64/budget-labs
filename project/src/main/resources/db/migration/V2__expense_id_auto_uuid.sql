ALTER TABLE public.expense
DROP CONSTRAINT IF EXISTS expense_pkey;

ALTER TABLE public.expense
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE public.expense ADD PRIMARY KEY (id);