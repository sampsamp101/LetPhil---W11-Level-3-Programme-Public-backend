import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabaseClient.js";

export const getAllProducts = async (req: Request, res: Response, next:NextFunction) => {
  
  let query = supabase.from("products").select("*", { count: "exact" });
  
  let defaultPage = 1;
  let limitPages = 20
  const {minPrice, maxPrice, sort, page, limit} = req.query;

  const min = Number(minPrice);
  if (typeof minPrice === "string" && minPrice.trim() !== "" && Number.isFinite(min)) {
    query = query.gte("price", min);
  }
  const max = Number(maxPrice);
  if (typeof maxPrice === "string" && maxPrice.trim() !== "" && Number.isFinite(max)) {
    query = query.lte("price", max);
  }
  if (sort === "price_asc"){
      query = query.order('price', {ascending: true});
  }
  if (sort === "price_desc"){
      query = query.order('price', {ascending: false});
  }

 if (typeof page === "string" && Number.isInteger(Number(page)) && Number(page) >= 1) {
    defaultPage = Number(page);
  }

  if (typeof limit === "string" && Number.isInteger(Number(limit)) && Number(limit) >= 1) {
    limitPages = Math.min(Number(limit), 100);
  }
    //defaultpage = 1 
    //default limit = 20
    //start = (1 -1 )* 20 = 0
    //end = ()
    const start = (defaultPage - 1) * limitPages;
    const end = start + limitPages - 1;
      
    query = query.range(start,end);

    const { data, error, count } = await query;

      if (error) {
        return next(error);
      }
      
      if (!data){
          return res.status(200).json([]);
      }
  return res.status(200).json({data, total: count, page: defaultPage, limit: limitPages});
};

export const getSpecificProduct = async (req: Request, res: Response, next:NextFunction) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    return next(error);
  }
  if (!data) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }
  return res.status(200).json(data);
};

export const addNewProduct = async (req: Request, res: Response, next:NextFunction) => {
  const { name, price } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (price === undefined) {
    return res.status(400).json({ error: "Price is required" });
  }

  const { data, error } = await supabase
    .from("products")
    .insert(req.body)
    .select()
    .single();

  if (error) {
    return next(error);
  }

  return res.status(201).json(data);
};

export const changeProduct = async (req: Request, res: Response, next:NextFunction) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .update(req.body)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return next(error);
  }
  if (!data) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }
  return res.status(200).json(data);
};


export const deleteSpecificProductId = async (req: Request, res: Response, next:NextFunction) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return next(error);
  }
  if (!data) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }
  return res.status(200).json({ message: `Deleted product ${id}` });
};
