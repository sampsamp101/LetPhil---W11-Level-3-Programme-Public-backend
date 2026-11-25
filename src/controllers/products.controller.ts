import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient.js";

export const getAllProducts = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};

export const getSpecificProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }
  return res.status(200).json(data);
};

export const addNewProduct = async (req: Request, res: Response) => {
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
    return res.status(500).json({ error: error.message });
  }
  return res.status(201).json(data);
};

export const changeProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .update(req.body)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }
  return res.status(200).json(data);
};


export const deleteSpecificProductId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }
  return res.status(200).json({ message: `Deleted product ${id}` });
};
